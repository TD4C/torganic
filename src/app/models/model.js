const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        category: String,
        productId: String,
        name: String,
        slug: String,
        price: String,
        originalPrice: String,
        discount: String,
        image: String,
        rating: String,
        reviews: String,
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Products', productSchema);

module.exports = Product;
