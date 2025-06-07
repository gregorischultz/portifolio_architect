import { deleteProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";
import { deleteProjectSchema } from "@/schemasZod/projectSchemas";
import { z } from "zod";

export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    authenticateToken("admin")(req, res, async () => {
        try {
            const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
            const validatedData = deleteProjectSchema.parse({ id });

            const deletedProject = await deleteProject(validatedData.id);

            res.status(200).json({
                message: "Projeto deletado com sucesso",
                deletedProject,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Erro de validação", errors: error.errors });
            }
            res.status(500).json({ message: error.message || "Erro ao deletar projeto" });
        }
    });
}
