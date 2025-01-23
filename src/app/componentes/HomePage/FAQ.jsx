'use client'
import { useState } from "react";
import styles from '@/app/styles/FAQ.module.css';

export default function FAQ() {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => { //Funçao para abrir e fechar a pergunta clicada
        setOpenQuestion(openQuestion === index ? null : index); //Se a pergunta clicada ja esta aberta, fecha-a, caso contrario, abre-a
    }

    const questions = [
        {
            question: "O que é modelagem 3D de arquitetura e como ela pode beneficiar meu projeto?",
            answer:
                "A modelagem 3D de arquitetura é o processo de criar representações digitais tridimensionais de edifícios e espaços. Ela permite visualizar o projeto antes da construção, identificando problemas potenciais, melhorando a apresentação para clientes e investidores, e ajudando a tomar decisões informadas sobre design e materiais.",
        },
        {
            question: "Quais tipos de projetos vocês atendem?",
            answer: "",
        },
        {
            question: "Quais ferramentas e tecnologias vocês utilizam?",
            answer: "",
        },
        {
            question: "Quanto tempo leva para entregar um projeto?",
            answer: "",
        },
        {
            question: "Posso solicitar ajustes no modelo ou na renderização após a entrega?",
            answer: "",
        },
    ];


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Perguntas Frequentes</h1>
            <div className={styles.faqList}>
                {questions.map((item, index) => (
                    <div key={index} className={styles.faqItem}>
                        <div className={`${styles.question} ${openQuestion === index ? styles.active : ""}`}
                            onClick={() => toggleQuestion(index)}>
                            <span>{item.question}</span>
                            <img
                                src="/arrow.png" // Caminho da imagem da seta
                                alt="Seta para expandir"
                                className={`${styles.arrow} ${openQuestion === index ? styles.rotate : ""
                                    }`} // Aplica rotação na imagem quando a pergunta está aberta
                            />
                        </div>
                        {openQuestion === index && (
                            <div className={styles.answer}>{item.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}