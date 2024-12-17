import { loginUser } from "@/controllers/authController";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Metodo nao permitido' });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Por favor envie o email e a senha.' })
        }

        const token = await loginUser(email, password);
        res.status(200).json({ token });
    } catch (err) {
        console.error(`[LOGIN ERROR]: ${err.message}`) //log do erro
        res.status(401).json({ message: err.message }) //resposta generica para o usuario
    }

}

//o usuario envia o email e password no corpo da requisiçao
//verifica de o email existe no banco
//comparamos a senha enviada com o hash armazenado no banco
//gera um token JWT com os dados do usuario
//envia o token para o front