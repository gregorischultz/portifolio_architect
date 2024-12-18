import { updateProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";
import { z } from "zod";

// Esquema de validação para atualizar o projeto
const updateProjectSchema = z.object({
    id: z.string().regex(/^\d+$/, "O ID deve ser um número válido").transform(Number),
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres").optional(),
    descripition: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres").optional(),
    images: z.array(z.string().url("A URL da imagem é inválida")).optional(),
    videos: z.array(z.string().url("A URL do vídeo é inválida")).optional(),
});

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

            // Extrai os dados validados
            const { id, title, descripition, images, videos } = validatedData;

            // Chama a função do controller para atualizar o projeto
            const updatedProject = await updateProject(id, title, descripition, images, videos);

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
