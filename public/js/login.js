document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    function validateInput(input, condition, errorMessage) {
        const container = input.closest('.login-input');
        const errorDiv = container.querySelector('.login-error');
        if (condition) {
            input.classList.remove('red');
            input.classList.add('green');
            errorDiv.textContent = '';
        } else {
            input.classList.remove('green');
            input.classList.add('red');
            errorDiv.textContent = errorMessage;
        }
    }

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        validateInput(
            usernameInput,
            username !== '',
            'Vui lòng nhập tên đăng nhập',
        );
        validateInput(passwordInput, password !== '', 'Vui lòng nhập mật khẩu');

        if (!username || !password) return;

        try {
            const res = await fetch('/login', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Đăng nhập thành công!');
                // Không cần lưu token — đã ở trong cookie từ server
                window.location.href = data.isAdmin ? '/admin' : '/';
            } else {
                validateInput(
                    usernameInput,
                    false,
                    'Tên đăng nhập không đúng.',
                );
                validateInput(passwordInput, false, 'Mật khẩu không đúng.');
            }
        } catch (err) {
            console.error(err);
            alert('Lỗi kết nối đến server.');
        }
    });
});
