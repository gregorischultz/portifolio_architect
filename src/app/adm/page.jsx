"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/ADMpage.module.css";
import NavBar from "../componentes/NavBar";

export default function AdminPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/adm/login");
            return;
        }

        fetchProjects(token);
    }, []);

    const fetchProjects = async (token) => {
        try {
            const res = await fetch("/api/project", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Erro ao carregar os projetos.");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProject = () => {
        router.push("/adm/Addproject");
    };

    const handleEdit = (id) => {
        router.push(`/adm/edit/${id}`);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!confirm("Tem certeza que deseja excluir este projeto?")) return;
        try {
            const res = await fetch(`/api/project/delete/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Erro ao excluir o projeto.");
            setProjects(projects.filter((project) => project.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <NavBar />
            <h2>Painel Administrativo</h2>

            <button className={styles.addButton} onClick={handleAddProject}>
                ➕ Adicionar Projeto
            </button>

            {loading && <p>Carregando...</p>}
            {error && <p className={styles.error}>{error}</p>}

            <ul className={styles.list}>
                {projects.map((project) => (
                    <li key={project.id} className={styles.projectItem}>
                        {project.title}
                        <div className={styles.actionButtons}>
                            <button onClick={() => handleEdit(project.id)} className={styles.editButton}>
                                ✏️ Editar
                            </button>
                            <button onClick={() => handleDelete(project.id)} className={styles.deleteButton}>
                                🗑️ Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
