const siterouter = require('./site');
const loginroutes = require('./login');
const cartrouter = require('./shoppingCart');
function route(app) {
    app.use('/', loginroutes);
    // Đặt trước để tránh bị trùng với trang home
    app.use('/', cartrouter);
    app.use('/', siterouter);
}

module.exports = route;
