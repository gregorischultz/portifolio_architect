// components/Footer.js
import styles from '@/app/styles/Footer.module.css';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className={styles.footer}>
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
        </footer>
    );
}
