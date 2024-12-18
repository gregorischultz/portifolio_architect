import { deleteProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";
import { deleteProjectSchema } from "@/schemasZod/projectSchemas"



export default async function handler(req, res) {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    // Middleware para autenticar e garantir que o usuário é admin
    authenticateToken("admin")(req, res, async () => {
        try {
            // Validação do ID usando Zod
            const validatedData = deleteProjectSchema.parse(req.query);

            // Chama a função do controller para deletar o projeto
            const deletedProject = await deleteProject(validatedData.id); // Função no controller lida com o banco de dados

            // Resposta de sucesso
            res.status(200).json({
                message: "Projeto deletado com sucesso",
                deletedProject,
            });
        } catch (error) {
            // Tratamento de erros (erros de validação ou do banco de dados)
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Erro de validação", errors: error.errors });
            } else {
                res.status(500).json({ message: error.message || "Erro ao deletar projeto" });
            }
        }
    });
}

