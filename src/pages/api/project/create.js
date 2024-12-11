import { createProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Metodo nao permitido' });
    }

    try {
        authenticateToken(req, res, async () => {
            const { title, descripition, images, videos } = req.body;
            const project = await createProject(title, descripition, images, videos);
            res.status(201).json(project);
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}