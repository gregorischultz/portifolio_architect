import { updateProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";
import { parseForm, config as formConfig } from "@/lib/parseForm";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: '4mb', // Ajustável conforme necessário
    },
};

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    authenticateToken("admin")(req, res, async () => {
        try {
            const { fields, files } = await parseForm(req);
            const { id } = req.query;

            console.log("FIELDS RECEBIDOS:", fields);
            console.log("FILES RECEBIDOS:", files);

            const rawTitle = fields.title;
            const rawDescription = fields.description;
            const rawCategory = fields.category;

            const title = Array.isArray(rawTitle) ? rawTitle[0] : rawTitle;
            const description = Array.isArray(rawDescription) ? rawDescription[0] : rawDescription;
            const category = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;


            if (!title || !description || !category) {
                return res.status(400).json({ message: "Campos obrigatórios ausentes: title, description ou category" });
            }

            // Processa imagens
            const imagePaths = [];
            if (files.images) {
                const imgs = Array.isArray(files.images) ? files.images : [files.images];
                imgs.forEach((file) => {
                    if (file?.filepath) {
                        const filename = path.basename(file.filepath);
                        imagePaths.push(`/uploads/${filename}`);
                    }
                });
            }

            console.log("Atualizando projeto com os seguintes dados:", {
                id,
                title,
                description,
                category,
                imagePaths,
                videos: [] // Por enquanto, você está ignorando vídeos
            });

            // Chama o controller para atualizar
            const updatedProject = await updateProject(
                Number(id),
                title,
                description,
                imagePaths,
                [] // Se for usar vídeos, adicionar lógica semelhante
            );

            res.status(200).json({
                message: "Projeto atualizado com sucesso",
                updatedProject,
            });
        } catch (err) {
            console.error("Erro na API de update:", err.message);
            console.error(err.stack);
            res.status(500).json({
                message: "Erro ao atualizar projeto",
                error: err.message,
            });
        }
    });
}
