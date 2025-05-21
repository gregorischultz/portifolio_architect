"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/Login.module.css";

export default function Login() {
    //Estados para armazenar email, senha e possiveis erros de login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    //Funçao que trata o login
    const handleLogin = async (e) => {
        e.preventDefault(); //evita o recarregamento da pagina ao enviar o formulario 
        setError("") //reseta erros anteriores

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json(); // converte a resposta em JSON

            if (!res.ok) throw new Error(data.message);

            localStorage.setItem("token", data.message);
            router.push("/adm");
        } catch (error) {
            setError("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <div className={styles.container} >
            <h2>Login</h2>
            <form onSubmit={handleLogin} className={styles.form} >
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha"
                    required
                    className={styles.input} 
                />
                <button type="submit" className={styles.button} >Entrar</button>
            </form>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}