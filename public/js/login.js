document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const fullNameInput = document.getElementById('full-name');
    const errorDivs = document.querySelectorAll('.login-error');

    function validateInput(input, condition, errorMessage) {
        let errorContainer = input.closest('.login-input');
        let errorElement = errorContainer.querySelector('.login-error');
        let inputContainer = input.closest('.login-input__container');
        let iconElement = errorContainer.querySelector('.error-icon');

        if (!errorElement) return;

        if (condition) {
            input.classList.remove('red');
            input.classList.add('green');
            errorElement.textContent = '';
            if (iconElement) iconElement.style.display = 'none';
        } else {
            input.classList.remove('green');
            input.classList.add('red');
            errorElement.textContent = errorMessage;

            if (!iconElement) {
                iconElement = document.createElement('i');
                iconElement.classList.add(
                    'fas',
                    'fa-exclamation-triangle',
                    'error-icon',
                );
                inputContainer.appendChild(iconElement);
            }
            iconElement.style.display = 'block';
        }
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const fullName = fullNameInput.value.trim();

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(
            (user) => user.email === email && user.fullName === fullName,
        );

        validateInput(emailInput, email !== '', 'Vui lòng nhập email.');
        validateInput(fullNameInput, fullName !== '', 'Vui lòng nhập họ tên.');

        if (!user) {
            validateInput(emailInput, false, 'Email hoặc họ tên không đúng.');
            validateInput(
                fullNameInput,
                false,
                'Email hoặc họ tên không đúng.',
            );
        } else {
            validateInput(emailInput, true);
            validateInput(fullNameInput, true);

            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Đăng nhập thành công!');
            window.location.href = '/';
        }
    });
});
