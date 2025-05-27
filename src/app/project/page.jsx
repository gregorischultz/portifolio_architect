import React from "react";
import Breadcrumb from "../componentes/ProjectPage/Breadcrumb";
import ProjectFilters from "../componentes/ProjectPage/ProjectFilters";
import ProjectGrid from "../componentes/ProjectPage/ProjectGrid";
import NavBar from "../componentes/NavBar";

export default function Projetos() {
    return (
        <>
            <div><NavBar /></div>
            <Breadcrumb />
            <ProjectFilters />
            <ProjectGrid projects={[]} />
        </>
    );
}
