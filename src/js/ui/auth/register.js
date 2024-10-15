import { register } from "../../api/auth/register.js";

/**
 * Handles the registration form submission.
 *
 * @async
 * @function onRegister
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves once the registration is complete.
 * @throws Will display an alert if the registration fails.
 */
export async function onRegister(event) {
    event.preventDefault();

    const registerData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        bio: document.getElementById('bio') ? document.getElementById('bio').value : null,
        banner: document.getElementById('banner') ? document.getElementById('banner').value : null,
        avatar: document.getElementById('avatar') ? document.getElementById('avatar').value : null,
    };

    try {
        const result = await register(registerData);

        if (result) {
            alert('Registration successful! Redirecting you to login...');
            window.location.href = '/auth/login/';
        }
    } catch (error) {
        console.error(error);
        alert(`Registration failed: ${error.message}`);
    }
}
