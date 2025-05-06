class checkoutcontroller {
    // [GET] checkout
    checkout(req, res) {
        res.render('checkout', {
            title: 'Trang thanh toán',
            styles: '<link rel="stylesheet" href="/css/checkout.css">',
            scripts: '',
        });
    }
}
module.exports = new checkoutcontroller();
