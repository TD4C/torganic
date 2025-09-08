document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('/admin/data', {
            method: 'GET',
            credentials: 'include',
        });

        const contentType = res.headers.get('Content-Type');
        if (contentType && contentType.includes('text/html')) {
            const text = await res.text();
            throw new Error('Server trả về HTML thay vì JSON: ' + text);
        }

        if (!res.ok) {
            throw new Error('Bạn không có quyền hoặc token không hợp lệ');
        }

        const data = await res.json();
        console.log('Dữ liệu nhận được:', data);
    } catch (err) {
        console.error('Lỗi xác thực:', err);
        alert(err.message || 'Bạn không có quyền hoặc token không hợp lệ');
        window.location.href = '/login';
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.admin-tabs__button');
    const doanhthu = document.querySelector('.doanhthu-section');
    const product = document.querySelector('.product-section');
    const danhgia = document.querySelector('.danhgia-section');
    links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach((l) => {
                l.classList.remove('admin-tabs__button--active');
            });
            link.classList.add('admin-tabs__button--active');
            if (index == 0) {
                doanhthu.classList.remove('hidden');
                product.classList.add('hidden');
                danhgia.classList.add('hidden');
            } else if (index === 1) {
                product.classList.remove('hidden');
                doanhthu.classList.add('hidden');
                danhgia.classList.add('hidden');
            } else if (index === 2) {
                danhgia.classList.remove('hidden');
                doanhthu.classList.add('hidden');
                product.classList.add('hidden');
            }
        });
    });
});
