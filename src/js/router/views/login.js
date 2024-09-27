import {onLogin} from "../../ui/auth/login"
import {setLogoutListener} from "../../ui/global/logout.js";
/**
 * Attaches a submit event listener to the login form if it exists.
 *
 * @function
 * @returns {void}
 * @throws Will log an error message if the form is not found.
 */
document.addEventListener("DOMContentLoaded", () => {
    setLogoutListener();
});

const form = document.forms.login;

if (form) {
    form.addEventListener('submit', onLogin);
} else {
    console.log('Login failed.');
}

form.addEventListener("submit", onLogin);
