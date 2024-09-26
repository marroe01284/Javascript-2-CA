import { API_SOCIAL_PROFILES, API_KEY } from "../constants";
import { getKey } from "../auth/key";

/**
 * Updates the user profile.
 *
 * @param {Object} profileData - The profile data to update (bio, avatar, banner).
 * @returns {Promise<void>} A promise that resolves if the update request is successful.
 * @throws Will throw an error if the network request fails.
 */
export async function updateProfile(profileData) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);
    
    const token = await getKey(); 
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    // Get the current user's name from local storage or another source
    const username = localStorage.getItem('userID');  // Assuming the username is stored in localStorage

    const requestOptions = {
        method: "PUT", 
        headers: myHeaders,
        body: JSON.stringify(profileData),
        redirect: "follow"
    };

    try {
        // Update profile endpoint with the actual username
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to update profile: ${response.statusText}`);
        }
        console.log('Profile updated successfully');
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
}
