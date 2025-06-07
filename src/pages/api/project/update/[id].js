import { updateProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";
import { parseForm, config as formConfig } from "@/lib/parseForm"; // ✅ CORRETO
import fs from "fs";
import path from "path";

export const config = formConfig;

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    authenticateToken("admin")(req, res, async () => {
        try {
            const { fields, files } = await parseForm(req);
            const { id } = req.query;

            // Extrai dados
            const title = fields.title;
            const description = fields.description;
            const category = fields.category;

            // Processa imagens
            const imagePaths = [];
            if (files.images) {
                const imgs = Array.isArray(files.images) ? files.images : [files.images];
                imgs.forEach((file) => {
                    const filename = path.basename(file.filepath);
                    imagePaths.push(`/uploads/${filename}`);
                });
            }

            // Chama o controller para atualizar
            const updatedProject = await updateProject(
                Number(id),
                title,
                description,
                imagePaths,
                [] // se tiver vídeos, processa igual
            );

            res.status(200).json({
                message: "Projeto atualizado com sucesso",
                updatedProject,
            });
        } catch (err) {
            res.status(500).json({ message: err.message || "Erro ao atualizar projeto" });
        }
    });
}
