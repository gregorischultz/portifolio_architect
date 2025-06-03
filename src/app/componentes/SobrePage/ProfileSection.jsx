import styles from '@/app/styles/ProfileSection.module.css'

export default function ProfileSection() {
  return (
    <section className={styles.profile}>
      <div className={styles.content}>
        <img src="https://placehold.co/436x508" alt="Philippe Carvalho" className={styles.image} />
        <div className={styles.text}>
          <h2 className={styles.name}>Philippe Carvalho</h2>
          <p className={styles.description}>
            Mestre em Arquitetura e Urbanismo, é o visionário por trás da ImaginARQ. Com uma carreira dedicada à
            inovação e à eficiência, possui uma vasta experiência em projectos comerciais e residenciais, tanto para
            clientes particulares como para instituições públicas. Especialista em Renderização 3D, Philippe combina
            criatividade e estratégia para transformar visões arquitetónicas em realidade.
            <br /><br />
            <strong>A sua expertise abrange:</strong>
            <br />•⁠ ⁠Especialização em renderizações de <span className={styles.highlight}>alta conversão de vendas</span>;
            <br />•⁠ ⁠Experiência no mercado de modelagem digital;
            <br />•⁠ ⁠Certificações pelos melhores cursos de 3D do Brasil.
            <br /><br />
            A sua liderança impulsiona a ImaginARQ a entregar soluções visuais que redefinem o padrão de excelência no
            mercado.
          </p>
        </div>
      </div>
    </section>
  )
}