/**
 * Retrieves the access token from localStorage.
 *
 * @async
 * @function getKey
 * @returns {Promise<string|null>} A promise that resolves to the access token if found, or null if not found.
 * @throws Will log an error message if the access token is not found in localStorage.
 */
export async function getKey() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error("Access token not found in localStorage.");
        return null;
    }
    return accessToken;
}
