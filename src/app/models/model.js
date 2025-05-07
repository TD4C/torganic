const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        productId: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        price: { type: Number, required: true },
        originalPrice: { type: Number },
        discount: { type: Number },
        image: { type: String },
        rating: { type: Number, default: 0 },
        reviews: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Product', productSchema); // đổi "Products" → "Product" để đúng convention

module.exports = Product;
