const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.error('Không tìm thấy token trong cookie');
        return res.status(401).json({ message: 'Không tìm thấy token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res
                .status(401)
                .json({ message: 'Token không hợp lệ hoặc hết hạn' });
        }

        req.user = decoded;
        next();
    });
};

function authorizeAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        console.error('Người dùng không có quyền admin'); // Log lỗi phân quyền
        res.status(403).send('Bạn không có quyền truy cập');
    }
}

module.exports = { authenticate, authorizeAdmin };
