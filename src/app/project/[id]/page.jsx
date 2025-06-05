// app/project/[id]/page.jsx
'use client'

import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/ProjectDetail.module.css';
import { use } from 'react';
import Contato from '@/app/componentes/Contato';
import Footer from '@/app/componentes/Footer';
import NavBar from '@/app/componentes/NavBar';
import Hero from '@/app/componentes/Hero';

export default function ProjectDetailPage(props) {
    const [project, setProject] = useState(null);
    const params = use(props.params);

    useEffect(() => {
        async function fetchProject() {
            try {
                const res = await fetch(`/api/project/${params.id}`);
                if (!res.ok) throw new Error('Erro ao buscar projeto');
                const data = await res.json();
                setProject(data);
            } catch (error) {
                console.error('Erro ao carregar projeto:', error);
            }
        }
        fetchProject();
    }, [params.id]);

    if (!project) return <div>Carregando...</div>;

    return (
        <main className={styles.container}>
            <NavBar />
            <Hero />
            {/* Breadcrumb inline */}
            <nav className={styles.breadcrumb}>
                <span>Início</span>
                <span className={styles.separator}>/</span>
                <span>Projectos</span>
                <span className={styles.separator}>/</span>
                <span className={styles.active}>{project.title}</span>
            </nav>

            {/* Galeria de Imagens */}
            <section className={styles.gallerySection}>
                {project.images?.map((img) => (
                    <img
                        key={img.id}
                        src={img.url}
                        alt={`Imagem do projeto ${project.title}`}
                        className={styles.mainImage}
                    />
                ))}
            </section>

            {/* Projetos similares */}
            <section className={styles.similarSection}>
                <div className={styles.similarHeader}>
                    <h2>Projectos similares</h2>
                    <a href="/project" className={styles.viewMore}>Ver mais</a>
                </div>

                <div className={styles.similarGrid}>
                    {project.similar?.map((sim) => (
                        <div key={sim.id} className={styles.similarCard}>
                            <img src={sim.images?.[0]?.url} alt={sim.title} className={styles.similarImage} />
                            <h3>{sim.title}</h3>
                        </div>
                    ))}
                </div>
            </section>
            <Contato />
            <Footer />
        </main>
    );
}


