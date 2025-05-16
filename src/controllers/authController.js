import prisma from "@/lib/prisma"; //On importe l'instace Prima pour interagir avec la base de données
import bcrypt from "bcryptjs"; //On importe "bcryptjs" une bibliotheque utilisée pour comparer des mots de passe haches
import jwt from "jsonwebtoken"; //On importe "jsonwebtoken" pour creer des tokens JWT apres authentification reussie
import { z } from "zod"; //On importe "zod" une bibliotheque da validation de schema pour verifier les donnes saisies


//On definit un schema de validation avec zod
//Ce schema garantit que l'email a un format correct et que le mot de passe contient au moins 6 caracteres 
const loginSchema = z.object({
    email: z.string().email("Email invalido"), //verifica o formato de email
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres") // garante o minimo de caracteres
});


//On cree un classe d'erreur personnaliseé 'AuthError' pour gerer le erreurs specifiques d'authentication
//Elle herite de la classe 'Error' et permet de specifier un message et un code d'erreur
class AuthError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "AuthError";
        this.code = code;
    }
}


//Fonctiàon principale "loginUser" exporte. Elle prend l'email et le mot de passe comme paramétres
//Elle est utilisée pour authentifier un utilisateur administrateur
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
        } else if (error instanceof AuthError) {
            throw new Error(error.message); //retorna erro de autenticaçao
        }
        throw new Error(error.message || "Erro ao fazer login.");
    }


}