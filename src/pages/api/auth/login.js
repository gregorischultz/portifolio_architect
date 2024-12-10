import prisma from "@/lib/prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.status(405).json({ message: 'Metodo nao permitido' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
      }
    
    try { //esse try verifica se o usuario existe
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
          }

         const isValidPassword = await bcrypt.compare(password, user.password); //compara a senha com hash no banco

         if(!isValidPassword) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
         }

         //para gerar o token JWT
         const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
         );

         //retorna o token
         res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

//o usuario envia o email e password no corpo da requisiçao
//verifica de o email existe no banco
//comparamos a senha enviada com o hash armazenado no banco
//gera um token JWT com os dados do usuario
//envia o token para o front