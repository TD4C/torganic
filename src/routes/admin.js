const express = require('express');
const router = express.Router();
const {
    authenticate,
    authorizeAdmin,
} = require('../app/middleware/authMiddleware');

// Route để truy cập trang admin
router.get('/admin', authenticate, authorizeAdmin, (req, res) => {
    res.render('admin', {
        layout: 'admin',
        title: 'Admin',
        styles: '<link rel="stylesheet" href="/css/admin.css">',
        user: req.user, // Truyền thông tin người dùng vào view
        scripts: '<script src="/js/admin.js" defer></script>', // Kết nối script của admin
    });
});
// Thêm route trả về JSON dữ liệu admin
router.get('/admin/data', authenticate, authorizeAdmin, (req, res) => {
    res.json({
        message: 'Dữ liệu admin hợp lệ',
        user: req.user,
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    res.redirect('/login'); // Chuyển hướng về trang đăng nhập
});
module.exports = router;
