import styles from '@/app/styles/Hero.module.css';

export default function Hero({ titles = [], backgroundImage }) {
    const backgroundStyle = backgroundImage
        ? {
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }
        : {};

    return (
        <section className={styles.hero} style={backgroundStyle}>
            <div className={styles.content}>
                {titles.map((title, index) => (
                    <h1 key={index} className={styles.title}>
                        {title}
                    </h1>
                ))}
            </div>
        </section>
    );
}
