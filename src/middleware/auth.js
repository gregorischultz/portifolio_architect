import jwt from 'jsonwebtoken'; //aqui eu importo o pacote JWT para verificar os tokens


//funçao para autenticar o token jwt
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization; //essa linha vai obter o token do cabeçalho Authorization

    if (!authHeader) {
        return res.status(401).json({ message: 'Token nao fornecido' }); //aqui vai retonar erro se o token nao estiver presente
    };

    const token = authHeader.split(' ')[1]; //o token é enviado no formato "bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'Token invalido' }); //vai retornar erro se o formato do token dor invalido
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //aqui verifica o token usando a chave segreta configurada em .env
        req.user = decoded; //adiciona os dados do token (como o ID do usuario) ao objeto 'req' para uso posterior 
        next(); //passa a requisiçao para o proximo middleware ou handler
    } catch (err) {
        return res.status(403).json({ message: 'Token invalido ou expirado' }); //retora erro se o token for invalido ou expirado
    }
};