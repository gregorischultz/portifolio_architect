'use client';

import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from '../../styles/Services.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function ServicosSection() {
  const [currentSlider, setCurrentSlider] = useState(0);
  const [projects, setProjects] = useState([]);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 24 },
    centered: true,
    sliderChanged(s) {
      const rel = s?.track?.details?.rel;
      if (rel != null) {
        setCurrentSlider(rel);
      }
    },
  });

  const router = useRouter();

  useEffect(() => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setProjects(data);
      })
      .catch((err) => console.error('Erro ao buscar projetos:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slider?.current?.track?.details) {
        slider.current.next();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [slider]);

  const handleAddProject = () => {
    router.push("/project");
  };

  return (
    <section className={styles.services}>
      <h2 className={styles.title}>Nossos serviços</h2>

      {/* Carrossel de imagens */}
      <div className={styles.sliderWrapper}>
        <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
          {projects.map((project, idx) => (
            project?.images?.length > 0 ? (
              <div
                key={project.id}
                className={`keen-slider__slide ${idx === currentSlider ? styles.activeSlide : styles.inactiveSlide
                  }`}
              >
                <div
                  className={styles.slideImageWrapper}
                  style={{ width: 780, height: (780 * 480) / 780 }}
                >
                  <Image
                    src={project.images[0].url}
                    alt={`Slide ${idx + 1}`}
                    fill
                    className={styles.slideImage}
                  />
                </div>
              </div>
            ) : null
          ))}
        </div>
      </div>

      {/* Cards de serviço */}
      <div className={styles.servicesGrid}>
        {[
          {
            title: 'Modelação 3D',
            desc: 'Transformamos plantas e ideias em modelos digitais detalhados e fiáveis, perfeitos para visualização e estudo.',
          },
          {
            title: 'Renderizações Realistas',
            desc: 'Criamos imagens e vídeos de alta qualidade que mostram com precisão como será o seu projeto, antes mesmo de ser construído.',
          },
          {
            title: 'Festivais & Eventos',
            desc: 'Idealizamos conceitos em representações realistas para festas e eventos, permitindo uma análise detalhada antes da execução.',
          },
        ].map((item, idx) => (
          <article key={idx} className={styles.serviceCard}>
            <h3 className={styles.serviceTitle}>{item.title}</h3>
            <p className={styles.serviceDescription}>{item.desc}</p>
          </article>
        ))}
      </div>

      {/* Botão alinhado à direita */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className={styles.button} onClick={handleAddProject}>
          Ver todos os projectos
          <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
            <path d="M4 2L8 6L4 10" stroke="#FC6C0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
