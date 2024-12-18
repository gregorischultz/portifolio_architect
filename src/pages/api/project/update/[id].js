import { updateProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";
import { updateProjectSchema } from "@/schemasZod/projectSchemas"


export default async function handler(req, res) {
    // Verifica se o método da requisição é permitido
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    // Middleware para autenticar e verificar se o usuário é admin
    authenticateToken("admin")(req, res, async () => {
        try {
            // Validação dos dados enviados (tanto `req.query` quanto `req.body`)
            const validatedData = updateProjectSchema.parse({
                id: req.query.id,
                ...req.body,
            });

            // Chama a função do controller para atualizar o projeto
            const updatedProject = await updateProject(
                validatedData.id,
                validatedData.title,
                validatedData.descripition,
                validatedData.images,
                validatedData.videos
            );

            // Resposta de sucesso
            res.status(200).json({
                message: "Projeto atualizado com sucesso",
                updatedProject,
            });
        } catch (error) {
            // Diferencia erros de validação (Zod) e outros erros
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors
                });
            } else {
                res.status(500).json({
                    message: error.message || "Erro ao atualizar projeto"
                });
            }
        }
    });
}
