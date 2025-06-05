"use client"

import ProfileSection from '../componentes/SobrePage/ProfileSection'
import AboutImaginArqSection from '../componentes/SobrePage/AboutImaginArqSection'
import DiferenciaisSection from '../componentes/SobrePage/DiferenciaisSection'
import DepoimentosSection from '../componentes/SobrePage/DepoimentosSection'
import NavBar from '../componentes/NavBar'
import Contato from '../componentes/Contato'
import Footer from '../componentes/Footer'
import Hero from '../componentes/Hero'

// HeroSection, ContatoSection, Footer já existem e devem estar usados no _app.js ou layout

export default function SobrePage() {
    return (
        <>
            <NavBar />
            <Hero backgroundImage="/Hero2.png" />
            <main>
                <ProfileSection />
                <AboutImaginArqSection />
                <DiferenciaisSection />
                <DepoimentosSection />
            </main>
            <Contato />
            <Footer />
        </>
    )
}