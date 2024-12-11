import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) {
        throw new Error('Usuario nao encontrado')
    };

    const isPasswordValid =  await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error('Senha incorreta');
    };


    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;


}