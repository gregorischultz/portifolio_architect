"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import NavBar from "@/app/componentes/NavBar";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return router.push("/adm/login");
    setToken(storedToken);
    fetch(`/api/project/${id}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          images: data.images || [],
        });
      })
      .catch(() => setError("Erro ao buscar o projeto."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleImageRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("category", formData.category);
    formData.images.forEach((img) => form.append("images", img));

    try {
      const res = await fetch(`/api/project/update/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) throw new Error("Erro ao atualizar o projeto.");
      router.push("/adm");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} style={{ paddingTop: "85px" }} >
      <NavBar />
      <h2>Editar Projeto</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descrição"
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Categoria"
      />
      <input type="file" multiple onChange={handleImageAdd} />

      <ul>
        {formData.images.map((img, i) => (
          <li key={i}>
            {typeof img === "string" ? (
              <img src={img} width={100} />
            ) : (
              <p>{img.name}</p>
            )}
            <button type="button" onClick={() => handleImageRemove(i)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="submit">Salvar</button>
    </form>
  );
}
