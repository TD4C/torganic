module.exports = {
    mutiplemongoseToObj: function (mongoose) {
        return mongoose.map((mongooses) => mongooses.toObject());
    },
    mongooseToObj: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
