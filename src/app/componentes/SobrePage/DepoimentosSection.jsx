import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import styles from '@/app/styles/DepoimentosSection.module.css'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'João Silva',
    role: 'Arquitecto',
    message:
      'As imagens da Arq Attack transformaram as nossas ideias em algo real. Os clientes ficaram encantados, e foi muito mais fácil comunicar o conceito do projecto!',
  },
  {
    name: 'Ana Ribeiro',
    role: 'Promotora imobiliária',
    message:
      'Com as panorâmicas em VR, os nossos clientes ficaram tão impressionados que fecharam negócio na hora! É uma ferramenta indispensável para apresentações de impacto.',
  },
  {
    name: 'Catarina Lopes',
    role: 'Engenheira urbanística',
    message:
      'As renderizações criadas para o projecto de renovação da praça foram decisivas. Mostrámos à comunidade como o espaço ficaria, e conseguimos uma aceitação imediata.',
  },
]

export default function DepoimentosSection() {
  const [sliderRef] = useKeenSlider({ loop: true, slides: { perView: 1, spacing: 16 } })

  return (
    <section className={styles.testimonials}>
      <h2 className={styles.title}>O Que Dizem Sobre Nós</h2>
      <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
        {testimonials.map((item, i) => (
          <div className={`keen-slider__slide ${styles.slide}`} key={i}>
            <div className={styles.card}>
              <h4>{item.name}</h4>
              <p className={styles.role}>{item.role}</p>
              <p className={styles.message}>&ldquo;{item.message}&rdquo;</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}