// src/js/api/post/update.js
import { API_SOCIAL_POSTS, API_KEY } from "../constants";
import { getKey } from "../auth/key";


/**
 * Updates a post based on its ID.
 *
 * @param {string} id - The ID of the post to update.
 * @param {Object} postData - The updated post data.
 * @returns {Promise<void>} A promise that resolves if the update is successful.
 */
export async function updatePost(id, { title, body, tags, media }) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);

    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({ title, body, tags, media }),
        redirect: "follow"
    };

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, requestOptions);
        console.log(`API URL: ${API_SOCIAL_POSTS}/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to update post: ${response.statusText}`);
        }
        console.log('Post updated successfully');
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
}
