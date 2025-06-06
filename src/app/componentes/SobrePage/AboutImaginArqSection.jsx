"use client"

import styles from '@/app/styles/AboutImaginArqSection.module.css'
import { useRouter } from 'next/navigation';

export default function AboutImaginArqSection() {
  const router = useRouter();

  const handleAddProject = () => {
        router.push("/project");
    };


  return (
    <section className={styles.about}>
      <h2 className={styles.title}>Sobre ImaginARQ</h2>
      <blockquote className={styles.quote}>
        "Cada imagem é uma ponte entre a <span className={styles.highlight}>ideia</span> e a
        <span className={styles.highlight}> realidade</span>, elevando o seu projecto a novos patamares."
      </blockquote>
      <p className={styles.description}>
        Transformamos ideias em imagens que impressionam e conquistam. Com mais de 7 anos de experiência, somos
        especialistas em visualizações 3D fotos e vídeos realistas que capturam a essência de cada projecto, desde
        empreendimentos imobiliários até sonhos pessoais.
        <br /><br />
        Ajudamos Arquitectos, Designers de Interiores, Consultores Imobiliários e Clientes Finais a apresentarem as suas
        ideias com clareza e impacto. Mais do que criar imagens, somos parceiros na concretização de visões e soluções
        que impulsionam resultados. Cada projecto é tratado com o mais alto nível de profissionalismo e dedicação.
      </p>
      <div className={styles.stats}>
        <div>
          <span className={styles.statNumber}>+150</span>
          <span className={styles.statLabel}>Projectos Realizados</span>
        </div>
        <div>
          <span className={styles.statNumber}>3</span>
          <span className={styles.statLabel}>Países Atendidos</span>
        </div>
        <div>
          <span className={styles.statNumber}>7</span>
          <span className={styles.statLabel}>Anos de Experiência</span>
        </div>
      </div>
      <button className={styles.button} onClick={handleAddProject} >Ver todos os projectos</button>
    </section>
  )
}
