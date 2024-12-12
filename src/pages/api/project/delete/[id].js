import { deleteProject } from "@/controllers/projectController";
import { authenticateToken } from "@/middleware/auth";

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Metodo nao permitido' })
    }

    try {
        authenticateToken(req, res, async () => {
            const { id } = req.query;
            const deletedProject = await deleteProject(Number(id));
            res.status(200).json(deletedProject);
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}