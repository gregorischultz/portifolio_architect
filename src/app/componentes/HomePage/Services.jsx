// components/Services.jsx
import styles from '@/app/styles/Services.module.css';

export default function Services() {
  return (
    <section className={styles.services}>
      <h2 className={styles.title}>Nossos serviços</h2>
      <div className={styles.cards}>
        {/* Card 1 */}
        <div className={styles.card}>
          <div
            className={styles.image}
            style={{ backgroundImage: "url('/path/to/modelacao3d.jpg')" }}
          />
          <h3 className={styles.cardTitle}>Modelação 3D</h3>
          <p className={styles.cardDescription}>
            Transformamos planos e ideias em modelos digitais detalhados e fiáveis, perfeitos para visualização e apresentação.
          </p>
        </div>
        {/* Card 2 */}
        <div className={styles.card}>
          <div className={styles.image} style={{ background: '#D9D9D9' }} />
          <h3 className={styles.cardTitle}>Renderizações Foto-Realistas</h3>
          <p className={styles.cardDescription}>
            Criamos imagens de alta qualidade que mostram com precisão como será o seu projecto, antes mesmo de ser construído.
          </p>
        </div>
        {/* Card 3 */}
        <div className={styles.card}>
          <div className={styles.image} style={{ background: '#D9D9D9' }} />
          <h3 className={styles.cardTitle}>Panorâmicas VR 360°</h3>
          <p className={styles.cardDescription}>
            Proporcionamos experiências imersivas que permitem explorar projectos como se já estivessem prontos.
          </p>
        </div>
      </div>
      {/* Botão */}
      <div className={styles.viewAll}>
        <button className={styles.button}>
          Ver todos os projectos <span className={styles.arrow}>→</span>
        </button>
      </div>
    </section>
  );
}
