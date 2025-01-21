import styles from '@/app/styles/ProcessCard.module.css';

export default function ProcessCard({ numberImg, title, description }) {
    return (
        <div className={styles.card}>
            <div className={styles.number}
                style={{ backgroundImage: `url(${numberImg})` }} />
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
        </div>
    )
}