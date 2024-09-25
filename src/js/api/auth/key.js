export async function getKey() {
    const accsessToken = localStorage.getItem('accsessToken');
    if (!accessToken) {
            console.log('No access token found');
            return null;
        }
        return accessToken;
}
