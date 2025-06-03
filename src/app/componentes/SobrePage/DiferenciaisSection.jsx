import styles from '@/app/styles/DiferenciaisSection.module.css'

export default function DiferenciaisSection() {
  return (
    <section className={styles.diferenciais}>
      <h2 className={styles.title}>Nossos diferenciais</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h3>Qualidade</h3>
          <p>
            Não criamos apenas renderizações; criamos experiências visuais que emocionam, inspiram e convencem. Cada
            detalhe é pensado para impressionar e criar conexões.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Excelência</h3>
          <p>
            A nossa equipa combina a mais avançada tecnologia com uma abordagem criativa única, entregando resultados que
            equilibram precisão e beleza.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Expertise</h3>
          <p>
            As nossas imagens são ferramentas poderosas de comunicação e vendas, concebidas para destacar o valor e o
            potencial de cada projecto.
          </p>
        </div>
      </div>
    </section>
  )
}