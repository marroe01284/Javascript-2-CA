import { API_AUTH_LOGIN, API_KEY } from "../constants.js";

/**
 * Logs a user into the application by sending a POST request with email and password.
 *
 * @async
 * @function apiLogin
 * @param {Object} credentials - The login credentials.
 * @param {string} credentials.email - The user's email address.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the response data or an error message.
 * @throws Will return an error object if the login fails or a network error occurs.
 */
export async function apiLogin({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            return { error: 'Login failed.' };
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}
