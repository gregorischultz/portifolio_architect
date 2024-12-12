import { updateProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Metodo nao permitido' })
    }

    try {
        authenticateToken(req, res, async () => {
            const { id } = req.query;
            const { title, descripition, imagens, videos } = req.body;

            const updatedProject = await updateProject(Number(id), title, descripition, imagens, videos);
            res.status(200).json(updatedProject);
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}