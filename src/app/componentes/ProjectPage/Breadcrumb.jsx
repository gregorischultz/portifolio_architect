import styles from "@/app/styles/Breadcrumb.module.css";

export default function Breadcrumb() {
    return (
        <nav className={styles.breadcrumb}>
            <span>Inicio</span>
            <span className={styles.separetor}>/</span>
            <span className={styles.active}>Projectos</span>
        </nav>
    );
}