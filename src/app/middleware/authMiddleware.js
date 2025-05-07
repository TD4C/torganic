const { verifyToken } = require('../../util/jwt');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ message: 'Invalid token' });

    req.user = decoded; // gán thông tin user vào request
    next();
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};

module.exports = { authenticate, authorizeRoles };
