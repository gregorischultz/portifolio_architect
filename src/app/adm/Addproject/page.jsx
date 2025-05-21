"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdicionarProjetoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleImageChange = (index, value) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const handleAddImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          images: imageUrls.filter((url) => url.trim() !== ""),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao criar o projeto");
      }

      alert("✅ Projeto criado com sucesso!");
      router.push("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Adicionar Projeto</h1>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Imagens (URLs)</label>
        {imageUrls.map((url, index) => (
          <input
            key={index}
            type="url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={url}
            onChange={(e) => handleImageChange(index, e.target.value)}
            required
          />
        ))}

        <button
          type="button"
          onClick={handleAddImageField}
          style={{ marginTop: "0.5rem" }}
        >
          ➕ Adicionar outra imagem
        </button>

        <br />
        <br />
        <button type="submit">Criar Projeto</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
