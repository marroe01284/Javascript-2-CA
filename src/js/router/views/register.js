import { onRegister } from "../../ui/auth/register";
import { setLogoutListener } from "../../ui/global/logout.js";

document.addEventListener("DOMContentLoaded", () => {
    setLogoutListener();
});

/**
 * Attaches a submit event listener to the registration form.
 *
 * @function
 * @returns {void}
 */
const form = document.forms.register;

form.addEventListener("submit", onRegister);
