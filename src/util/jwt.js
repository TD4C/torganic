const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload, expiresIn = '1d') => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Log thông tin token đã giải mã
        return decoded;
    } catch (err) {
        console.error('Token verification error:', err); // Log lỗi nếu có
        return null; // Trả về null nếu có lỗi
    }
};

module.exports = { generateToken, verifyToken };
