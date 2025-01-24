import styles from '@/app/styles/Contato.module.css';

export default function Contato() {
    return (
        <section className={styles.contactSection}>
            <div className={styles.header}>
                <h1>Fale Conosco</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.description}>
                    <p>Pronto para dar vida ao seu projeto? Estamos aqui para ajudar! Entre
                        em contato e descubra como podemos transformar a sua visão em
                        realidade.<br />
                        Ou preencha o formulário, e entraremos em contato rapidamente!
                    </p>
                </div>
                <form className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor='name'>Nome</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            placeholder='Digite seu nome'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='name'>Email</label>
                        <input
                            type="Email"
                            id='Email'
                            name='Email'
                            placeholder='Digite seu email'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='name'>Conteudo</label>
                        <textarea
                            name="message"
                            id="message"
                            placeholder='Digite sua mensagem'
                        ></textarea>
                    </div>
                    <button type='submit' className={styles.submitButton}>
                        Enviar
                    </button>
                </form>
            </div>
        </section>
    )
}