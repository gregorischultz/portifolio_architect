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
            answer: "Trabalhamos com uma ampla variedade de projetos, incluindo residenciais, comerciais, urbanísticos e sustentáveis. Seja você um arquiteto, construtor ou cliente final, adaptamos nossos serviços às suas necessidades específicas.",
        },
        {
            question: "Quais ferramentas e tecnologias vocês utilizam?",
            answer: "Usamos softwares líderes do mercado, como AutoCAD, SketchUp, V-Ray e outras ferramentas avançadas para garantir alta precisão e qualidade nos modelos 3D e renderizações.",
        },
        {
            question: "Quanto tempo leva para entregar um projeto?",
            answer: "O prazo de entrega depende da complexidade e do tamanho do projeto. Para projetos simples, o prazo pode ser de 3 a 5 dias úteis. Já projetos mais complexos podem levar de 1 a 2 semanas. Oferecemos prazos personalizados de acordo com a necessidade do cliente.",
        },
        {
            question: "Posso solicitar ajustes no modelo ou na renderização após a entrega?",
            answer: "Sim! Estamos comprometidos em garantir a sua satisfação. Incluímos uma rodada de ajustes no valor do projeto. Caso sejam necessárias modificações adicionais, elas podem ser discutidas e cobradas à parte.",
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