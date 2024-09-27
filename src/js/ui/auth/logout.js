/**
 * Handles the logout process.
 * Removes the user's access token and user ID from localStorage and redirects to the login page.
 *
 * @function onLogout
 * @returns {void}
 */
export function onLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.href = '/auth/login/';
}
