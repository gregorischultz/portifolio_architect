
import styles from '@/app/styles/Process.module.css';
import ProcessCard from "./ProcessCard";

const steps = [
    { number: "1", title: "Exploração", subtitle: "E Briefing" },
    { number: "2", title: "Concepção", subtitle: "E Modelação 3D" },
    { number: "3", title: "Renderização", subtitle: "De Alta Qualidade" },
    { number: "4", title: "Revisões E", subtitle: "Ajustes Personalizado" },
    { number: "5", title: "Entrega Final", subtitle: "E Suporte" },
];


export default function Process() {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Nosso Processo</h2>
            <div className={styles.gridWrapper}>
                <div className={styles.cardText}>
                    <p>
                        Cada renderização é mais do que uma imagem, é uma experiência visual
                        que comunica, convence, encanta e desperta a <span className={styles.highlight}>imaginação</span>.
                    </p>
                </div>
                {steps.map(({ number, title, subtitle }) => (
                    <div className={styles.card} key={number}>
                        <div className={styles.numberWrapper}>
                            <span className={styles.number}>{number}</span>
                        </div>
                        <div className={styles.text}>
                            <span>{title}</span>
                            <span>{subtitle}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}