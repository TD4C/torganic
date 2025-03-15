const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/education', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Ket noi thanh cong');
    } catch (error) {
        console.log('Ket noi that bai');
    }
}
module.exports = { connect };
