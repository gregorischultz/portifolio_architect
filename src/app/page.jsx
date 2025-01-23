import styles from "./styles/page.module.css";
import NavBar from "./componentes/NavBar";
import Footer from "./componentes/Footer";
import Hero from "./componentes/HomePage/Hero";
import Services from "./componentes/HomePage/Services";
import Process from "./componentes/HomePage/Process";
import FAQ from "./componentes/HomePage/FAQ";

export default function Home() {
  return (
    <div className={styles.page}>
      <NavBar />
      <Hero />
      <Services />
      <Process />
      <FAQ />
      <Footer />
    </div>

  );
}
