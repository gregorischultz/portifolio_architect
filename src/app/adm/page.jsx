"use client"; //indica que esse componente roda no cliente

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "";



export default function AdminPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) { //se nao houver o token vai redirecionar para a pagina de login
            router.push("/adm/login");
            return;
        }

        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects", {
                    headers: { Authorization: `Bearer ${token}` }, //  Envia o token no cabeçalho
                });
                if (!res.ok) throw new Error("Erro ao carregar os projetos.");
                const data = await res.json();
                setProjects(data); // Armazena os projetos no estado
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className={styles.contaner}>
            <h2>Painel Administrativo</h2>
            {loading && <p>Carregando...</p>}
            {error && <p className={styles.error} >{error}</p>}
            <ul className={styles.list} >
                {projects.map((projects) => (
                    <li key={projects.id} className={styles.projectItem} >
                        {projects.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
