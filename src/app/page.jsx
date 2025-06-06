import styles from "./styles/page.module.css";
import NavBar from "./componentes/NavBar";
import Footer from "./componentes/Footer";
import Hero from "./componentes/Hero";
import Services from "./componentes/HomePage/Services";
import Process from "./componentes/HomePage/Process";
import FAQ from "./componentes/HomePage/FAQ";
import Contato from "./componentes/Contato";

export default function Home() {
  return (
    <div className={styles.page}>
      <NavBar />
      <Hero titles={['Você imagina,', 'nós idealizamos']} />
      <Services />
      <Process />
      <FAQ />
      <Contato />
      <Footer />
    </div>

  );
}
