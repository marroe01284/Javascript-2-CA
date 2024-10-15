import {API_SOCIAL_PROFILES, API_KEY} from "../constants";
import {getKey} from "../auth/key";

/**
 * Updates a post based on its ID.
 *
 * @param {string} id - The ID of the post to update.
 * @param {Object} postData - The updated post data.
 * @returns {Promise<void>} A promise that resolves if the update is successful.
 */
export async function updateProfile(profileData) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);

    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const username = localStorage.getItem('userID');

    const headerOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(profileData),
        redirect: "follow"
    };

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, headerOptions);
        if (!response.ok) {
            throw new Error(`Failed to update profile: ${response.statusText}`);
        }
        console.log('Profile updated successfully');
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
}
