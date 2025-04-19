import jwt from 'jsonwebtoken'; //Ici, on importe la bibliotheque 'jsonwebtoken' pour manipuler et verifier les tokens JWT


//On definit une fontion middleware appeleé 'authenticateToken'
export const authenticateToken = (requiredRole = "admin") => (req, res, next) => { //Elle prend un role requis (par defaut "admin") et retourne une fonction qui reçois les objets req, res et next
    const authHeader = req.headers.authorization; //On recupere l'en-tete "authorization" de la requete HTTP


    //Si l'en-tete authorization est absent
    //On affiche une erreur dans les logs et on renvoie une reponse 401 (non autorisé) avec un message d'erreur
    if (!authHeader) {
        console.error(`[AUTH ERROR] Token não fornecido. IP: ${req.ip}, Endpoint: ${req.originalUrl}`);
        return res.status(401).json({
            message: 'Token nao fornecido',
            error: 'Cabeçalho Authorization ausente'
        }); 
    };

    
    //On extrait le token JWT
    //L'en-tete est generalement sous la forme "Bearer <token>", donc on divise par l'espace et on prend la 2e partie
    const token = authHeader.split(' ')[1]; 


    //Si le token n'est pas trouvé (ou mal formaté), on renvoie une erreur 401 avec un message expliquant le format attendu
    if (!token) { 
        console.error(`[AUTH ERROR] Token ausente ou inválido no cabeçalho. IP: ${req.ip}, Endpoint: ${req.originalUrl}`);
        return res.status(401).json({
            message: 'Token inválido',
            error: 'Formato do token inválido (esperado: Bearer <token>)'
        }); 
    };



    try {
        //On tente verifier le token en utilisant la clé secrete stockee dans les variables d'environnement
        //Si le token est valide, il est "decode" et on obtient les donnees qu'il contient
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        //On verifie si le role de l'utilisateur dans le token correspond au role requis
        //Sinon, on renvoie une erreur 403 (interdit) pour indiquer un manque de permission
        if(decoded.role !== requiredRole) {
            return res.status(403).json({ message: "Acesso negado: permissão insuficiente." });
        }


        //Si tout est correct, on ajoute les infos de l'utilisateur (decodeés du token) a l'objet req
        //Puis on passe au liddleware suivante frace a la fonction "next()"
        req.user = decoded; 
        console.info(`[AUTH SUCCESS] Token válido. Usuário ID: ${decoded.id}, Endpoint: ${req.originalUrl}`);
        next(); 
    } catch (err) { //Si une erreur se produit lors de la verification du token, on passe dans ce bloc catch
        
        // Diferenciar tipos de erros do JWT

        //Si l'erreur est que le token a expiré, on informe l'utulisateur et on demande de se reconnecter
        if (err.name === 'TokenExpiredError') {
            console.error(`[AUTH ERROR] Token expirado. IP: ${req.ip}, Endpoint: ${req.originalUrl}`);
            return res.status(403).json({
                message: 'Token expirado',
                error: 'O token fornecido expirou. Faça login novamente.'
            });
        }


        //Si l'erreur est liee a un token invalide (falsifie ou malforme), on retourne une erreur 403 avec une explication
        if (err.name === 'JsonWebTokenError') {
            console.error(`[AUTH ERROR] Token inválido. IP: ${req.ip}, Endpoint: ${req.originalUrl}`);
            return res.status(403).json({
                message: 'Token inválido',
                error: 'O token fornecido não é válido.'
            });
        }

        // Pour toute autre erreur non prévue, on logue l'erreur complete et on retourne une erreur 500 (erreur interne du serveur)
        console.error(`[AUTH ERROR] Erro inesperado ao verificar token. IP: ${req.ip}, Endpoint: ${req.originalUrl}, Error: ${err.message}`);
        return res.status(500).json({
            message: 'Erro interno',
            error: 'Ocorreu um erro inesperado ao verificar o token.'
        });
    }
}