const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Ket noi thanh cong');
    } catch (error) {
        console.log('Ket noi that bai');
    }
}
module.exports = { connect };
