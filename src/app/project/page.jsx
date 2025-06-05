"use client"

import React, { useEffect, useState } from "react";
import Breadcrumb from "../componentes/ProjectPage/Breadcrumb";
import ProjectFilters from "../componentes/ProjectPage/ProjectFilters";
import ProjectGrid from "../componentes/ProjectPage/ProjectGrid";
import NavBar from "../componentes/NavBar";
import Contato from "../componentes/Contato";
import Footer from "../componentes/Footer";

export default function Projetos() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch('/api/project');
                const data = await res.json();
                console.log(data)
                setProjects(data);
            } catch (err) {
                console.log("Erro ao buscar projetos:", err);
            }
        }
        fetchProjects();
    }, []);
    return (
        <>
            <div><NavBar /></div>
            <Breadcrumb />
            <ProjectFilters />
            <ProjectGrid projects={projects} />
            <Contato />
            <Footer />
        </>
    );
}
