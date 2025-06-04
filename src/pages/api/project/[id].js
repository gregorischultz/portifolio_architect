import { getProjectById } from "@/controllers/projectController";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Metodo nao permitido' });
    }

    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'ID do projeto é obrigatório' });
        }

        const project = await getProjectById(id);

        if (!project) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }

        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
