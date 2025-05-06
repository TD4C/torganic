class accountController {
    //   [GET] account
    account(req, res) {
        res.render('account', {
            title: 'Trang khách hàng',
            styles: '<link rel="stylesheet" href="/css/account.css">',
            scripts: '<script src="/js/profile.js"></script>',
        });
    }
}
module.exports = new accountController();
