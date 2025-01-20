import styles from "./styles/page.module.css";
import NavBar from "./componentes/NavBar";
import Footer from "./componentes/Footer";
import Hero from "./componentes/HomePage/Hero";

export default function Home() {
  return (
    <div className={styles.page}>
      <NavBar />
      <Hero />
      <Footer />
    </div>

  );
}
