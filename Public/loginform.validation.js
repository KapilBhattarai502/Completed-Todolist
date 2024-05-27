document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        // Prevent the form from submitting
        event.preventDefault();

        // Perform validation
        let isValid = true;

        const email = emailInput.value.trim();
        if (!isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        const password = passwordInput.value.trim();
        if (password === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        if (isValid) {
            const response = await fetch('/submit/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = data.redirect;
            } else {
                // Show error message from the server
                showError(emailInput, data.message);
            }
        }
    });

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, message) {
        const inputControl = input.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
    }

    function clearError(input) {
        const inputControl = input.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.remove('error');
    }
});
