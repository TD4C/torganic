const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true }, // thường là email
        password: { type: String, required: true },
        email: { type: String },
        phone: { type: String },

        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// So sánh mật khẩu khi đăng nhập
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
