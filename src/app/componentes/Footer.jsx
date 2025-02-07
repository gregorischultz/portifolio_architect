// components/Footer.js
"use client";
import styles from '@/app/styles/Footer.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
    const [clickCount, setClickCount] = useState(0);
    const [showLogin, setShowLogin] = useState(false);
    const [isMounted, setIsmounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsmounted(true);
    }, []);

    const handleSecretClick = () => {
        setClickCount((prev) => prev + 1);

        if (clickCount + 1 === 4) { //se clicar 4 vezes mostra o botao
            setShowLogin(true);
            setClickCount(0);
        }
    };

    const handleLoginClick = () => {
        if (isMounted) {
            router.push("/adm/login");
        } // redireciona para a pagina de login
    }


    return (
        <footer className={styles.footer} onClick={handleSecretClick}>
            <div className={styles.footerContent}>
                <div className={styles.contactInfo}>
                    <div className={styles.contactItem}>
                        <Image
                            src="/whatsapp.png"
                            alt="Phone Icon"
                            width={20}
                            height={20}
                            className={styles.icon}
                        />
                        <span className={styles.contactText}>+351 934 499 618</span>
                    </div>
                    <div className={styles.contactItem}>
                        <Image
                            src='/Mail.png'
                            alt="Email Icon"
                            width={20}
                            height={20}
                            className={styles.icon}
                        />
                        <span className={styles.contactText}>arqattack.pt@gmail.com</span>
                    </div>
                </div>
                <div className={styles.logo}>
                    <h1 className={styles.logoText}>ImaginARQ</h1>
                </div>
                <div className={styles.footerNote}>
                    <p>2025 Imaginarq All rights reserved. Built by Grégori SCHULTZ</p>
                </div>
            </div>

            {showLogin && (
                <button className={styles.loginButton} onClick={handleLoginClick} >
                    Login
                </button>
            )}
        </footer>
    );
}
