import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

export default prisma;

//esse codigo inicializa e reutiliza o cliente prisma
//agora eu posso importar em qualquer lugar do backend o prisma para consultar o banco de dados