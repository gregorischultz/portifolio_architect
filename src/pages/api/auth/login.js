import { loginUser } from "@/controllers/authController";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Metodo nao permitido' });
    }

    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (err) {
        res.status(401).json({ message: err.message })
    }

}

//o usuario envia o email e password no corpo da requisiçao
//verifica de o email existe no banco
//comparamos a senha enviada com o hash armazenado no banco
//gera um token JWT com os dados do usuario
//envia o token para o front