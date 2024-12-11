import jwt from 'jsonwebtoken';


//funçao para autentcar o token jwt
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Token nao fornecido' });
    };

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token invalido' });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token invalido ou expirado' });
    }
};