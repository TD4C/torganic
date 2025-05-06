const siterouter = require('./site');
const loginroutes = require('./login');
const cartrouter = require('./shoppingCart');
const accountrouter = require('./account');
const checkoutrouter = require('./checkout');
function route(app) {
    app.use('/', loginroutes);
    // Đặt trước để tránh bị trùng với trang home
    app.use('/', cartrouter);
    app.use('/', siterouter);
    app.use('/', accountrouter);
    app.use('/', checkoutrouter);
}

module.exports = route;
