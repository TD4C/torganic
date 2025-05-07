const User = require('../models/model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../util/jwt');

class loginController {
    // [GET] /login
    login(req, res) {
        res.render('login', {
            title: 'Đăng nhập',
            styles: '<link rel="stylesheet" href="/css/login.css">',
            scripts: '<script src="/js/login.js"></script>',
        });
    }

    // [POST] /login
    async handleLogin(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user)
                return res
                    .status(400)
                    .json({ message: 'Sai tài khoản hoặc mật khẩu' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res
                    .status(400)
                    .json({ message: 'Sai tài khoản hoặc mật khẩu' });

            const token = generateToken({
                id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
            });

            res.json({ token });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // [GET] /register
    register(req, res) {
        res.render('register', {
            title: 'Đăng ký',
            styles: '<link rel="stylesheet" href="/css/register.css">',
            scripts: '<script src="/js/register.js"></script>',
        });
    }

    // [POST] /register
    async handleRegister(req, res) {
        const { username, password } = req.body;
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser)
                return res
                    .status(400)
                    .json({ message: 'Tài khoản đã tồn tại' });

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password: hashedPassword,
                isAdmin: false, // hoặc true nếu tạo admin
            });

            await newUser.save();
            res.status(201).json({ message: 'Đăng ký thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

module.exports = new loginController();
