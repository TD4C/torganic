const product = require('../models/model');
const { mutiplemongoseToObj } = require('../../util/mongose');

class siteControllers {
    // [GET] home

    index(req, res, next) {
        const category = req.query.category || 'all';
        const query = category === 'all' ? {} : { category: category };

        product
            .find(query)
            .then((products) => {
                res.render('home', {
                    title: 'Torganic',
                    scripts: '<script src="/js/home.js"></script>',
                    products: mutiplemongoseToObj(products),
                    category: category,
                });
            })
            .catch(next);
    }
}

module.exports = new siteControllers();
