import {API_SOCIAL_PROFILES, API_KEY} from "../constants";
import {getKey} from "../auth/key";
/**
 * Fetches the profile of a user by their username.
 *
 * @async
 * @function readProfile
 * @param {string} username - The username of the profile to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the profile data.
 * @throws Will throw an error if the profile retrieval fails or a network error occurs.
 */
export async function readProfile(username) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);

    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
}

export async function readProfiles(limit, page) {
}
