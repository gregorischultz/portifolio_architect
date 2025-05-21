import styles from "";

export default function Breadcrump() {
    return (
        <nav className={styles.breadcrump}>
            <span>Inicio</span>
            <span className={styles.separetor}>/</span>
            <span className={styles.active}>Projectos</span>
        </nav>
    );
}