class cartControllers {
    // [GET] /shoppingCart
    Cart(req, res) {
        res.render('shoppingCart', {
            title: 'Giỏ hàng',
            styles: '<link rel="stylesheet" href="/css/shoppingCart.css">',
            scripts: '',
        });
    }
}
module.exports = new cartControllers();
