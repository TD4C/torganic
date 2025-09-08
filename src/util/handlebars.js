module.exports = {
    formatCurrency: function (price) {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
    },
};
