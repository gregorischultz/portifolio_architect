"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdicionarProjetoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]); // arquivos locais
  const [error, setError] = useState("");

  const router = useRouter();

  const handleFileChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    mediaFiles.forEach((file) => {
      formData.append("media", file); // mesmo campo para imagens e vídeos
    });

    try {
      const res = await fetch("/api/project/create", {
        method: "POST",
        body: formData,
        credentials: "include", // envia o cookie JWT
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao criar projeto");
      }

      alert("✅ Projeto criado com sucesso!");
      router.push("/admin/Addproject");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Adicionar Projeto</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <label>Categoria</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          <option value="3D exteriores">3D exteriores</option>
          <option value="3D interiores">3D interiores</option>
          <option value="3D Comerciais">3D Comerciais</option>
        </select>

        <label>Imagens e vídeos (do computador)</label>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
        />

        <br />
        <br />
        <button type="submit">Criar Projeto</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
