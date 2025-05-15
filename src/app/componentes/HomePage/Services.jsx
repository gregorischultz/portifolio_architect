'use client';

import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from '../../styles/Services.module.css';

// Instalar com: npm install keen-slider ou yarn add keen-slider

export default function ServicosSection() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    autoplay: true,
    duration: 3000,
  });

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Nossos serviços</h2>

      <div className={styles.sliderWrapper}>
        <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
          {[780, 620, 460, 460, 620].map((w, idx) => (
            <div key={idx} className="keen-slider__slide">
              <div
                className={styles.slideImageWrapper}
                style={{ width: w, height: (w * 480) / 780 }}
              >
                <Image
                  src={`https://placehold.co/${w}x${(w * 480) / 780}`}
                  alt={`Slide ${idx + 1}`}
                  fill
                  className={styles.slideImage}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.servicesGrid}>
        {[
          {
            title: 'Modelação 3D',
            desc: 'Transformamos plantas e ideias em modelos digitais detalhados e fiáveis, perfeitos para visualização e estudo.',
          },
          {
            title: 'Renderizações Realistas',
            desc: 'Criamos imagens e videos de alta qualidade que mostram com precisão como será o seu projecto, antes mesmo de ser construído.',
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

      <button className={styles.button}>
        Ver todos os projectos
        <svg width="20" height="20" viewBox="0 0 12 12" fill="none">
          <path d="M4 2L8 6L4 10" stroke="#FC6C0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  );
}
