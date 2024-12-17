import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";


//definindo o esquema de validaçao usando zod
const loginSchema = z.object({
    email: z.string().email("Email invalido"), //verifica o formato de email
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres") // garante o minimo de caracteres
});


class AuthError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "AuthError";
        this.code = code;
    }
}


//funçao para login de usuario administrador
export const loginUser = async (email, password) => {
    try {

        const validatedData = loginSchema.parse({ email, password }); //valida os dados de entrada

        const user = await prisma.user.findUnique({ where: { email: validatedData.email } }); //busca o usuarios no banco de dados pelo email
        if (!user) {
            throw new AuthError("Usuário não encontrado", "USER_NOT_FOUND");
        };

        if (user.role !== 'admin') { //verifica se o usuario tem a role "admin"
            throw new AuthError("Acesso restrito: apenas o administrador pode fazer login", "ACCESS_DENIED");
        }

        //compara a senha informada com o hash armazenado
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AuthError("Senha incorreta", "INVALID_PASSWORD");
        };

        //gera o token JWT incluindo o id e role do usuario
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message); // Retorna erro de validação amigável
        }
        throw new Error(error.message || "Erro ao fazer login.");
    }


}