import React from "react";
import NavBar from "../componentes/NavBar"; // Importando a NavBar
import styles from '@/app/styles/About.module.css'; // Importando o módulo de estilos

export default function Sobre() {
    return (
        <>
            <div><NavBar /></div>

            <main className={styles.mainContent}>

                {/* Seção Philippe Carvalho */}
                <section className={styles.section}>
                    <div className={styles.profile}>
                        <img className={styles.profileImage} src="https://placehold.co/436x508" alt="Philippe Carvalho" />
                        <div className={styles.profileDetails}>
                            <h2 className={styles.profileName}>Philippe Carvalho</h2>
                            <p className={styles.profileDescription}>
                                Mestre em Arquitetura e Urbanismo, é o visionário por trás da ImaginARQ. Com uma carreira dedicada à inovação e à eficiência...
                            </p>
                            <h3 className={styles.expertise}>A sua expertise abrange:</h3>
                            <ul className={styles.expertiseList}>
                                <li>Especialização em renderizações de alta conversão de vendas</li>
                                <li>Experiência no mercado de modelagem digital</li>
                                <li>Certificações pelos melhores cursos de 3D do Brasil</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Seção Sobre ImaginARQ */}
                <section className={styles.aboutSection}>
                    <h2 className={styles.aboutTitle}>Sobre ImaginARQ</h2>
                    <blockquote className={styles.quote}>
                        "Cada imagem é uma ponte entre a <span className={styles.highlight}>ideia</span> e a <span className={styles.highlight}>realidade</span>, elevando o seu projeto a novos patamares."
                    </blockquote>
                    <p className={styles.aboutText}>
                        Transformamos ideias em imagens que impressionam e conquistam. Com mais de 7 anos de experiência, somos especialistas em visualizações 3D...
                    </p>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <p className={styles.statValue}>+150</p>
                            <p className={styles.statLabel}>Projectos Realizados</p>
                        </div>
                        <div className={styles.stat}>
                            <p className={styles.statValue}>3</p>
                            <p className={styles.statLabel}>Países Atendidos</p>
                        </div>
                        <div className={styles.stat}>
                            <p className={styles.statValue}>7</p>
                            <p className={styles.statLabel}>Anos de Experiência</p>
                        </div>
                    </div>
                </section>

                {/* Seção Nossos Diferenciais */}
                <section className={styles.differentialsSection}>
                    <h2 className={styles.differentialsTitle}>Nossos Diferenciais</h2>
                    <div className={styles.differentials}>
                        <div className={styles.differentialItem}>
                            <h3 className={styles.differentialTitle}>Qualidade</h3>
                            <p className={styles.differentialText}>
                                Não criamos apenas renderizações; criamos experiências visuais que emocionam, inspiram e convencem. Cada detalhe é pensado para impressionar e criar conexões.
                            </p>
                        </div>
                        <div className={styles.differentialItem}>
                            <h3 className={styles.differentialTitle}>Excelência</h3>
                            <p className={styles.differentialText}>
                                A nossa equipa combina a mais avançada tecnologia com uma abordagem criativa única, entregando resultados que equilibram precisão e beleza.
                            </p>
                        </div>
                        <div className={styles.differentialItem}>
                            <h3 className={styles.differentialTitle}>Expertise</h3>
                            <p className={styles.differentialText}>
                                As nossas imagens são ferramentas poderosas de comunicação e vendas, concebidas para destacar o valor e o potencial de cada projeto.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Seção "O que dizem sobre nós" - Carrossel */}
                <section className={styles.testimonialsSection}>
                    <h2 className={styles.testimonialsTitle}>O Que Dizem Sobre Nós</h2>
                    <div className={styles.carousel}>
                        <div className={styles.carouselItem}>
                            <div className={styles.testimonial}>
                                <div className={styles.testimonialImage}>
                                    <img src="https://placehold.co/34x34" alt="João Silva" />
                                </div>
                                <div className={styles.testimonialContent}>
                                    <h3 className={styles.testimonialName}>João Silva</h3>
                                    <p className={styles.testimonialRole}>Arquitetura</p>
                                    <p className={styles.testimonialText}>
                                        As imagens da Arq Attack transformaram as nossas ideias em algo real. Os clientes ficaram encantados, e foi muito mais fácil comunicar o conceito do projeto!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.carouselItem}>
                            <div className={styles.testimonial}>
                                <div className={styles.testimonialImage}>
                                    <img src="https://placehold.co/34x34" alt="Ana Ribeiro" />
                                </div>
                                <div className={styles.testimonialContent}>
                                    <h3 className={styles.testimonialName}>Ana Ribeiro</h3>
                                    <p className={styles.testimonialRole}>Promotora imobiliária</p>
                                    <p className={styles.testimonialText}>
                                        Com as panorâmicas em VR, os nossos clientes ficaram tão impressionados que fecharam negócio na hora! É uma ferramenta indispensável para apresentações de impacto.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.carouselItem}>
                            <div className={styles.testimonial}>
                                <div className={styles.testimonialImage}>
                                    <img src="https://placehold.co/34x34" alt="Catarina Lopes" />
                                </div>
                                <div className={styles.testimonialContent}>
                                    <h3 className={styles.testimonialName}>Catarina Lopes</h3>
                                    <p className={styles.testimonialRole}>Engenheira urbanística</p>
                                    <p className={styles.testimonialText}>
                                        As renderizações criadas para o projeto de renovação da praça foram decisivas. Mostrámos à comunidade como o espaço ficaria, e conseguimos uma aceitação imediata.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </>
    );
};
