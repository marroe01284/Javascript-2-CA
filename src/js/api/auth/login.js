import {API_AUTH_LOGIN, API_KEY} from "../constants.js";

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
            return {error: 'Login failed.'};
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
}
