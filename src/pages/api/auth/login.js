import { loginUser } from "@/controllers/authController";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Metodo nao permitido' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Por favor envie o email e a senha.' });
    }

    const token = await loginUser(email, password);

    const isDev = process.env.NODE_ENV !== 'production';
    const cookieOptions = `token=${token}; Path=/; HttpOnly; SameSite=Strict${isDev ? '' : '; Secure'}`;
    res.setHeader('Set-Cookie', cookieOptions);

    res.status(200).json({ message: "Login realizado com sucesso." });
  } catch (err) {
    console.error(`[LOGIN ERROR]: ${err.message}`);
    res.status(401).json({ message: err.message });
  }
}


//o usuario envia o email e password no corpo da requisiçao
//verifica de o email existe no banco
//comparamos a senha enviada com o hash armazenado no banco
//gera um token JWT com os dados do usuario
//envia o token para o front