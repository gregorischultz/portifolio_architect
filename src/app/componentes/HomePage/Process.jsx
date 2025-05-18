
import styles from '@/app/styles/Process.module.css';
import ProcessCard from "./ProcessCard";


export default function Process() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Nosso Processo</h2>
            <p className={styles.description}>
                Cada renderizaçao é mais do que uma imagem, é uma experiencia visual que comunica, convence, encana e despeta a <span className={styles.highlight}>imaginaçao</span>
            </p>
            <div className={styles.steps}>
                <article className={`${styles.card} ${styles.card1}`}>
                    <h3>1. Exploraçao e briefing</h3>
                </article>
                <article className={`${styles.card} ${styles.card2}`}>
                    <h3>2. Concepção e Modelação 3D</h3>
                </article>
                <article className={`${styles.card} ${styles.card3}`}>
                    <h3>3. Renderização de Alta Qualidade</h3>
                </article>
                <article className={`${styles.card} ${styles.card4}`}>
                    <h3>4. Revisões e Ajustes Personalizado</h3>
                </article>
                <article className={`${styles.card} ${styles.card5}`}>
                    <h3>5. Entrega Final e Suporte</h3>
                </article>
            </div>
        </section>
    )
}