"use client"


import ProfileSection from '../componentes/SobrePage/ProfileSection'
import AboutImaginArqSection from '../componentes/SobrePage/AboutImaginArqSection'
import DiferenciaisSection from '../componentes/SobrePage/DiferenciaisSection'
import DepoimentosSection from '../componentes/SobrePage/DepoimentosSection'

// HeroSection, ContatoSection, Footer já existem e devem estar usados no _app.js ou layout

export default function SobrePage() {
    return (
        <>
            <main>
                <ProfileSection />
                <AboutImaginArqSection />
                <DiferenciaisSection />
                <DepoimentosSection />
            </main>
        </>
    )
}