
import styles from "@/app/styles/Process.module.css";
import ProcessCard from "./ProcessCard";


export default function Process() {
    const cards = [
        {
            numberImg: '/1..png',
            title: 'Exploração e Briefing',
            description:
                'Partilhe connosco as suas ideias, objectivos e expectativas. A nossa equipa estará atenta a cada detalhe para compreender a sua visão.',
        },
        {
            numberImg: '/2.png',
            title: 'Concepção e Modelação 3D',
            description:
                'Com base no briefing, desenvolvemos modelos 3D detalhados e precisos, assegurando que todos os aspectos do projecto estão fielmente representados.',
        },
        {
            numberImg: '/3.png',
            title: 'Renderização de Alta Qualidade',
            description:
                'Criamos imagens foto-realistas que dão vida ao projecto, capturando a essência e o impacto que deseja transmitir.',
        },
        {
            numberImg: '/4.png',
            title: 'Revisões e Ajustes Personalizados',
            description:
                'Valorizamos o seu feedback e ajustamos os detalhes para garantir que o resultado final corresponde exactamente ao que idealizou.',
        },
        {
            numberImg: '/5.png',
            title: 'Entrega Final e Suporte',
            description:
                'Apresentamos o produto final em formatos práticos e adequados à sua utilização, oferecendo suporte para aplicações futuras e novas ideias.',
        },
    ];

    return (
        <section className={styles.process}>
            <h2 className={styles.title}>Nosso Processo</h2>
            <p className={styles.description}>O nosso processo é desenhado para ser eficiente, claro e centrado no cliente, garantindo uma experiência fluida e resultados extraordinários.</p>
            <div className={styles.cards}>
                {cards.map((card, index) => (
                    <ProcessCard
                        key={index}
                        numberImg={card.numberImg}
                        title={card.title}
                        description={card.description}
                    />
                ))}
            </div>

        </section>
    )
}