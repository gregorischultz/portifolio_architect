import prisma from "@/lib/prisma";


//funçao para adicionar novo projeto
export const createProject = async (title, descripition, images, videos) => {
    const project = await prisma.project.create({
        data: {
            title,
            descripition,
            images: {
                create: images.map((url) => ({ url })),
            },
            videos: {
                create: videos.map((url) => ({ url })),
            },
        },
        include: { images: true, videos: true },
    });
    return project;
};


//funçao para atualizar um projeto existente
export const updateProject = async (id, title, descripition, images, videos) => {
    const updateProject = await prisma.project.update({
        where: { id },
        data: {
            title,
            descripition,
            images: {
                deleteMany: {},
                create: images.map((url) => ({ url })),
            },
            videos: {
                deleteMany: {},
                create: videos.map((url) => ({ url })),
            },
        },
        include: { images: true, videos: true },
    });
    return updateProject;
};


//funçao para remover um projeto
export const deleteProject = async (id) => {
    const deleteProject = await prisma.project.delete({
        where: { id },
    });
    return deleteProject;
};


//funçao para listar todos os projetos (para exibiçao publica)
export const getAllProjects = async () => {
    const projects = await prisma.project.findMany({
        include: { images: true, videos: true }
    });
    return projects;
};


//funçao para obter detalhas de um projeto especifico
export const getProjectById = async (id) => {
    const project = await prisma.project.findUnique({
        where: { id },
        include: { images: true, videos: true },
    });
    if (!project) {
        throw new Error('Projeto nao encontrado.');
    }
    return project;
};