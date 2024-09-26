export function onLogout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    window.location.href = '/auth/login/';
}
