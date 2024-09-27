import {onLogout} from "../auth/logout.js";
/**
 * Attaches a click event listener to the logout button.
 * When the logout button is clicked, the `onLogout` function is triggered.
 *
 * @function setLogoutListener
 * @returns {void}
 */
export function setLogoutListener() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', onLogout)
    }
}