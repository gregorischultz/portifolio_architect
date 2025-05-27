import { createProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";
import { createProjectSchema } from "@/schemasZod/projectSchemas";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Metodo nao permitido' });
    }

    authenticateToken("admin")(req, res, async () => {
        try {
            // Validação com Zod
            const validatedData = createProjectSchema.parse(req.body);

            // Criação do projeto
            const project = await createProject(
                validatedData.title,
                validatedData.description,
                validatedData.category,
                validatedData.images,
                validatedData.videos
            );

            //Resposta de sucesso
            res.status(201).json({ message: "Projeto criado com sucesso", project });
        } catch (error) {
            //Tratamento de erros, seja ele qual for
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Erro de validação", errors: error.errors });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    });
}