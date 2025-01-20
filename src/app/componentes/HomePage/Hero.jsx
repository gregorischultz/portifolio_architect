import styles from '@/app/styles/Hero.module.css';


export default function Hero(){
    return(
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={styles.title}>Voce imagina,</h1>
                <h1 className={styles.title}>nos idealizamos</h1>
            </div>
        </section>
    )
}