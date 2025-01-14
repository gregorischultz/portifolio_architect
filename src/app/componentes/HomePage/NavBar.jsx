import Link from 'next/link';
import styles from '../../styles/NavBar.module.css';

export default function NavBar() {
    return (
        <header className={styles.NavBar}>
            <div className={styles.container}>
                <nav className={styles.menuLeft}>
                    <Link href="/project" className={styles.navItem} >
                        Projetos
                    </Link>
                    <Link href="/serviços" className={styles.navItem} >
                        Serviços
                    </Link>
                    <Link href="/about" className={styles.navItem} >
                        Sobre
                    </Link>
                </nav>

                <div className={styles.logo}>
                    <Link href="/">ImaginARQ</Link> {/*Link para pagina inicial*/}
                </div>

                <div className={styles.menuRight}>
                    <button className={styles.contactButton}>Contato</button>
                </div>
            </div>
        </header>
    )
}