document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.account-nav__link');
    const infoSection = document.getElementById('info-section');
    const ordersSection = document.getElementById('orders-section');

    links.forEach((link, index) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Xoá class active cũ
            links.forEach((l) =>
                l.classList.remove('account-nav__link--active'),
            );
            link.classList.add('account-nav__link--active');

            // Hiển thị phần tương ứng
            if (index === 0) {
                infoSection.classList.remove('hidden');
                ordersSection.classList.add('hidden');
            } else if (index === 1) {
                ordersSection.classList.remove('hidden');
                infoSection.classList.add('hidden');
            }
        });
    });
    document
        .querySelector('.logout-button')
        .addEventListener('click', async () => {
            await fetch('/logout', { method: 'GET', credentials: 'include' });
            window.location.href = '/login';
        });
});
