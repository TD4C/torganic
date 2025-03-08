class siteControllers {
    // [GET] home
    index(req, res) {
        res.render('home', {
            title: 'Torganic',
            scripts: '<script src="/js/home.js"></script>',
        });
    }
}
module.exports = new siteControllers();
