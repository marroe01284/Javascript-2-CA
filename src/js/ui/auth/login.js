import { apiLogin } from '../../api/auth/login.js';

/**
 * Handles the login form submission.
 *
 * @async
 * @function onLogin
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the login process completes.
 * @throws Will display an alert if the login fails.
 */
export async function onLogin(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const result = await apiLogin({ email, password });

    if (result.error) {
        alert("Login failed: " + result.error);
    } else {

        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("userID", result.data.name);

        window.location.href = "/";
    }
}
