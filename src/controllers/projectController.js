import prisma from "@/lib/prisma";





//funçao para adicionar novo projeto
export const createProject = async (title, descripition, images = [], videos = []) => {

    //cria o projeto no banco de dados
    const project = await prisma.project.create({
        data: {
            title: title,
            descripition: descripition,
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
    const existingProject = await prisma.project.findUnique({
        where: { id },
        include: { images: true, videos: true }
    });

    if (!existingProject) {
        throw new Error("Projeto nao encontrado");
    }


    //Para manter imagens que ja existem e nao foram removidas
    const imageUrlsToAdd = images.filter(
        (url) => !existingProject.images.some((img) => img.url === url)
    );
    const imageIdsToDelete = existingProject.images
        .filter((img) => !images.includes(img.url))
        .map((img) => img.id);


    //Para manter os videos que ja existem e nao foram removidos    
    const videoUrlsToAdd = videos.filter(
        (url) => !existingProject.videos.some((vid) => vid.url === url)
    );
    const videoIdsToDelete = existingProject.videos
        .filter((vid) => !videos.includes(vid.url))
        .map((vid) => vid.id);


    const updatedProject = await prisma.project.update({
        where: { id },
        data: {
            title,
            descripition,
            images: {
                deleteMany: {
                    id: { in: imageIdsToDelete },
                },
                create: imageUrlsToAdd.map((url) => ({ url })),
            },
            // Excluir vídeos removidos
            videos: {
                deleteMany: {
                    id: { in: videoIdsToDelete },
                },
                create: videoUrlsToAdd.map((url) => ({ url })),
            },
        },
        include: { images: true, videos: true },
    });
    return updatedProject;
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