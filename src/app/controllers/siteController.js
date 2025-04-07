const product = require('../models/model');
const { mutiplemongoseToObj } = require('../../util/mongose');

class siteControllers {
    // [GET] home
    // index(req, res) {
    // res.render('home', {
    //     title: 'Torganic',
    //     scripts: '<script src="/js/home.js"></script>',
    // });
    //      }
    index(req, res, next) {
        product
            .find({})

            .then((products) => {
                console.log(products);
                res.render('home', {
                    title: 'Torganic',
                    scripts: '<script src="/js/home.js"></script>',

                    products: mutiplemongoseToObj(products),
                });
            })
            .catch(next);
    }
}

module.exports = new siteControllers();
