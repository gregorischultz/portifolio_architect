import jwt from 'jsonwebtoken'; //aqui eu importo o pacote JWT para verificar os tokens


//funçao para autenticar o token jwt
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization; //essa linha vai obter o token do cabeçalho Authorization


    //Esse if abaixo vai verificar se o cabeçalho Authorization esta presente
    if (!authHeader) {
        console.error(`[AUTH ERROR] Token não fornecido. IP: ${req.ip}, Endpoint: ${req.originalUrl}`);
        return res.status(401).json({
            message: 'Token nao fornecido',
            error: 'Cabeçalho Authorization ausente'
        }); //aqui vai retonar erro se o token nao estiver presente
    };

    const token = authHeader.split(' ')[1]; //o token é enviado no formato "bearer <token>"

    if (!token) { //verifica se o token foi extraido corretamente
        console.error(`[AUTH ERROR] Token ausente ou inválido no cabeçalho. IP: ${req.ip}, Endpoint: ${req.originalUrl}`);
        return res.status(401).json({
            message: 'Token inválido',
            error: 'Formato do token inválido (esperado: Bearer <token>)'
        }); //vai retornar erro se o formato do token dor invalido
    };

    try {
        // Verificar o token com a chave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do token no objeto 'req'
        console.info(`[AUTH SUCCESS] Token válido. Usuário ID: ${decoded.id}, Endpoint: ${req.originalUrl}`);
        next(); // Passa para o próximo middleware ou handler
    } catch (err) {
        // Diferenciar tipos de erros do JWT
        if (err.name === 'TokenExpiredError') {
            console.error(`[AUTH ERROR] Token expirado. IP: ${req.ip}, Endpoint: ${req.originalUrl}`);
            return res.status(403).json({
                message: 'Token expirado',
                error: 'O token fornecido expirou. Faça login novamente.'
            });
        }

        if (err.name === 'JsonWebTokenError') {
            console.error(`[AUTH ERROR] Token inválido. IP: ${req.ip}, Endpoint: ${req.originalUrl}`);
            return res.status(403).json({
                message: 'Token inválido',
                error: 'O token fornecido não é válido.'
            });
        }

        // Qualquer outro erro inesperado
        console.error(`[AUTH ERROR] Erro inesperado ao verificar token. IP: ${req.ip}, Endpoint: ${req.originalUrl}, Error: ${err.message}`);
        return res.status(500).json({
            message: 'Erro interno',
            error: 'Ocorreu um erro inesperado ao verificar o token.'
        });
    }
}