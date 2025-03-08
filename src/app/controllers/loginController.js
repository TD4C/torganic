class loginController {
    // [GET] /login
    login(req, res) {
        res.render('login', {
            title: 'Đăng nhập',
            styles: '<link rel="stylesheet" href="/css/login.css">',
            scripts: '<script src="/js/login.js"></script>',
        });
    }

    // [GET] /register
    register(req, res) {
        res.render('register', {
            title: 'Đăng ký',
            styles: '<link rel="stylesheet" href="/css/register.css">',
            scripts: '<script src="/js/register.js"></script>',
        });
    }
}

module.exports = new loginController();
