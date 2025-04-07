document.addEventListener('DOMContentLoaded', function () {
    const productTabs = document.querySelectorAll('.pro_li');
    const products = document.querySelectorAll('.product');

    productTabs.forEach((tab) => {
        tab.addEventListener('click', function () {
            document
                .querySelector('.pro_active')
                .classList.remove('pro_active');
            tab.classList.add('pro_active');

            const category = tab.innerText
                .trim()
                .toLowerCase()
                .replace(' ', '-');

            // products.forEach(product => {
            //     if (category === "all" || product.dataset.category === category) {
            //         product.style.display = "block";
            //     } else {
            //         product.style.display = "none";
            //     }
            // });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopButton = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    scrollToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-bar input');
    const hiddenContent = document.getElementById('hiddenContent');

    searchInput.addEventListener('focus', function () {
        hiddenContent.style.display = 'block';
        setTimeout(() => {
            hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
            hiddenContent.style.opacity = '1';
        }, 10);
    });

    document.addEventListener('click', function (event) {
        if (
            !hiddenContent.contains(event.target) &&
            !searchInput.contains(event.target)
        ) {
            hiddenContent.style.maxHeight = '0';
            hiddenContent.style.opacity = '0';
            setTimeout(() => {
                hiddenContent.style.display = 'none';
            }, 300);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');

    let lastScrollY = window.scrollY;
    let ticking = false;
    let isFixed = false; // Trạng thái hiện tại của header

    function updateHeader() {
        let currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 230) {
            if (!isFixed) {
                // Chỉ đổi class nếu trạng thái thay đổi
                header.classList.add('header-fixed');
                header.classList.remove('header-visible');
                isFixed = true;
            }
        } else {
            if (isFixed) {
                // Chỉ đổi class nếu trạng thái thay đổi
                header.classList.add('header-visible');
                header.classList.remove('header-fixed');
                isFixed = false;
            }
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');

    products.forEach((product) => {
        product.addEventListener('click', () => {
            // Lấy thông tin sản phẩm từ data attributes

            const id = product.dataset.id || '';
            const name = encodeURIComponent(product.dataset.name || '');
            const price = encodeURIComponent(product.dataset.price || '');
            const original = encodeURIComponent(product.dataset.original || '');
            const discount = encodeURIComponent(product.dataset.discount || '');
            const img = encodeURIComponent(product.dataset.img || '');

            // Tạo URL với các tham số
            const url = `/product/product.html?id=${id}&name=${name}&price=${price}&original=${original}&discount=${discount}&img=${img}`;

            // Chuyển hướng tới trang chi tiết sản phẩm
            window.location.href = url;
        });
    });
});
// Lấy đối tượng biểu tượng và body
document.addEventListener('DOMContentLoaded', function () {
    const changeIcon = document.querySelector('.change__icon');
    const body = document.body;

    // Kiểm tra và thay đổi chế độ khi click
    changeIcon.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Chuyển đổi icon tùy thuộc vào chế độ
        const icon = changeIcon.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
});
