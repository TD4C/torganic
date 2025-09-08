// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const { generateToken } = require('../../util/jwt');

// class loginController {
//     // [GET] /login
//     login(req, res) {
//         res.render('login', {
//             title: 'Đăng nhập',
//             styles: '<link rel="stylesheet" href="/css/login.css">',
//             scripts: '<script src="/js/login.js"></script>',
//         });
//     }

//     // [POST] /login
//     async handleLogin(req, res) {
//         const { username, password } = req.body;

//         // Kiểm tra dữ liệu đầu vào
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
//         }

//         try {
//             const user = await User.findOne({ username });
//             if (!user)
//                 return res
//                     .status(400)
//                     .json({ message: 'Tên đăng nhập không tồn tại' });

//             const isMatch = await bcrypt.compare(password, user.password);

//             if (!isMatch)
//                 return res
//                     .status(400)
//                     .json({ message: 'Mật khẩu không đúng' });

//             const token = generateToken({
//                 id: user._id,
//                 username: user.username,
//                 isAdmin: user.isAdmin,
//             });

//             res.json({ token });
//         } catch (err) {
//             console.error('Server error:', err);
//             res.status(500).json({ message: 'Lỗi server' });
//         }
//     }

//     // [GET] /register
//     register(req, res) {
//         res.render('register', {
//             title: 'Đăng ký',
//             styles: '<link rel="stylesheet" href="/css/register.css">',
//             scripts: '<script src="/js/register.js"></script>',
//         });
//     }

//     // [POST] /register
//     async handleRegister(req, res) {
//         const { username, password } = req.body;

//         // Kiểm tra dữ liệu đầu vào
//         if (!username || !password) {
//             return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
//         }

//         try {
//             const existingUser = await User.findOne({ username });
//             if (existingUser)
//                 return res
//                     .status(400)
//                     .json({ message: 'Tài khoản đã tồn tại' });

//             const hashedPassword = await bcrypt.hash(password, 10);
//             const newUser = new User({
//                 username,
//                 password,
//                 isAdmin: false, // hoặc true nếu tạo admin
//             });

//             await newUser.save(); // Đảm bảo rằng save được gọi với await
//             res.status(201).json({ message: 'Đăng ký thành công' });
//         } catch (err) {
//             console.error('Server error:', err);
//             res.status(500).json({ message: 'Lỗi server' });
//         }
//     }
// }

// module.exports = new loginController();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../util/jwt');

class LoginController {
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

        // Kiểm tra dữ liệu đầu vào
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        try {
            // Tìm user trong database
            const user = await User.findOne({ username });
            if (!user)
                return res
                    .status(400)
                    .json({ message: 'Tên đăng nhập không tồn tại' });

            // So sánh mật khẩu
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch)
                return res.status(400).json({ message: 'Mật khẩu không đúng' });

            // Tạo JWT token
            const token = generateToken({
                id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
            });

            // Gửi token qua cookie
            res.cookie('token', token, {
                httpOnly: true, // Không thể truy cập từ JavaScript
                secure: process.env.NODE_ENV === 'production', // Đặt thành true nếu sử dụng HTTPS
                maxAge: 60 * 60 * 1000, // Token sống trong 1 giờ
                sameSite: 'Strict',
            });

            // Trả về token và isAdmin trong response
            res.json({
                message: 'Đăng nhập thành công',
                token,
                isAdmin: user.isAdmin,
            }); // Bao gồm isAdmin
        } catch (err) {
            console.error('Server error:', err);
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

        // Kiểm tra dữ liệu đầu vào
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: 'Vui lòng nhập đầy đủ thông tin' });
        }

        try {
            // Kiểm tra nếu username đã tồn tại trong database
            const existingUser = await User.findOne({ username });
            if (existingUser)
                return res
                    .status(400)
                    .json({ message: 'Tài khoản đã tồn tại' });

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password, // Lưu mật khẩu đã mã hóa
                isAdmin: false, // Đặt là false hoặc true nếu bạn muốn tạo admin
            });

            // Lưu người dùng vào database
            await newUser.save();
            res.status(201).json({ message: 'Đăng ký thành công' }); // Trả về thông báo đăng ký thành công
        } catch (err) {
            console.error('Server error:', err);
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

module.exports = new LoginController();
