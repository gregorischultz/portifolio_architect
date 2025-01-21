'use client'
import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/styles/NavBar.module.css';

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.NavBar}>
            <div className={styles.container}>
                <div className={styles.burgerMenu} onClick={() => setMenuOpen(!menuOpen)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <nav className={`${styles.menuLeft} ${menuOpen ? styles.menuExpand : ''}`}>
                    <Link href="/" className={styles.navItem} >
                        Inicio
                    </Link>
                    <Link href="/project" className={styles.navItem} >
                        Projetos
                    </Link>
                    <Link href="/about" className={styles.navItem} >
                        Sobre
                    </Link>
                    {menuOpen && (
                        <button className={styles.contactButton}>Contato</button>
                    )}
                </nav>

                <div className={styles.logo}>
                    <Link href="/">ImaginARQ</Link> {/*Link para pagina inicial*/}
                </div>


                {!menuOpen && (
                    <div className={styles.menuRight}>
                        <button className={styles.contactButton}>Contato</button>
                    </div>
                )}

            </div>
        </header>
    )
}