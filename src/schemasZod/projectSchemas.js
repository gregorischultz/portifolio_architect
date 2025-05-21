import { z } from "zod";


// Esquema de validação para atualizar o projeto
export const updateProjectSchema = z.object({
    id: z.string().regex(/^\d+$/, "O ID deve ser um número válido").transform(Number),
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres").optional(),
    descripition: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres").optional(),
    images: z.array(z.string().url("A URL da imagem é inválida")).optional(),
    videos: z.array(z.string().url("A URL do vídeo é inválida")).optional(),
});

//definindo o esquema de validaçao para criaçao de projetos 
export const createProjectSchema = z.object({
    title: z.string().min(3, "O titulo deve ter pelo menos 3 caracteres"),
    description: z.string().min(10, "A descriçao deve ter no minimo 10 caracteres"),
    images: z.array(z.string().url("URL invalida para imagem")).optional(),
    videos: z.array(z.string().url("URL invalida para video")).optional(),
})

// Esquema de validação para o ID (para deletar projeto)
export const deleteProjectSchema = z.object({
    id: z.string().regex(/^\d+$/, "O ID deve ser um número válido").transform(Number),
});