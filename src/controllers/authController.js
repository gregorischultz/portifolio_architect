import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class AuthError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "AuthError";
        this.code = code;
    }
}


export const loginUser = async (email, password) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new AuthError("Usuário não encontrado", "USER_NOT_FOUND");
        };

        if (user.role !== 'admin') {
            throw new AuthError("Acesso restrito: apenas o administrador pode fazer login", "ACCESS_DENIED");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AuthError("Senha incorreta", "INVALID_PASSWORD");
        };


        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return token;
    } catch (error) {
        if(error instanceof AuthError){
            throw error;
        }
        throw new Error("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
    }


}