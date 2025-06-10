import { createProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";
import { parseForm, config as formidableConfig } from "@/lib/parseForm.js"; // ✅ [ADICIONADO]
import fs from "fs"; 
import path from "path"; 

//  Desativa o body parser para uso com formidable
export const config = formidableConfig;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodo nao permitido" });
  }

  authenticateToken("admin")(req, res, async () => {
    try {
      //  Usar formidable para pegar campos e arquivos
      const { fields, files } = await parseForm(req);

      const title = fields.title?.[0] || fields.title;
      const description = fields.description?.[0] || fields.description;
      const category = fields.category?.[0] || fields.category;

      //  Processar arquivos recebidos
      const imagePaths = [];
      const videoPaths = [];

      const allFiles = Array.isArray(files.media) ? files.media : [files.media];

      for (const file of allFiles) {
        if (!file || !file.mimetype) continue;

        const isImage = file.mimetype.startsWith("image/");
        const isVideo = file.mimetype.startsWith("video/");

        const relativePath = `/uploads/${path.basename(file.filepath)}`;

        if (isImage) imagePaths.push(relativePath);
        else if (isVideo) videoPaths.push(relativePath);
      }

      //  Usar os dados extraídos para criar o projeto
      const project = await createProject(
        title,
        description,
        category,
        imagePaths,
        videoPaths,
        req.user.id
      );

      //  Resposta de sucesso
      res.status(201).json({ message: "Projeto criado com sucesso", project });
    } catch (error) {
      //  Removido Zod, pois não usamos JSON nesse fluxo
      res.status(500).json({ message: error.message || "Erro interno" });
    }
  });
}
