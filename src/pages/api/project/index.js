import { getAllProjects } from "@/controllers/projectController";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Metodo nao permitiido' })
    };

    try {
        const projects = await getAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}