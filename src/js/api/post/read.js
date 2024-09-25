import { API_SOCIAL_POSTS } from "../constants.js";
import { getKey } from "../auth/key.js";

export async function readPost(id) {
    const headers = new Headers();
    headers.append('X-Noroff-API-Key', 'YOUR_API_KEY');

    const token = await getKey();
    headers.append('Authorization', `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: headers,
    };

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to read post: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}



export async function readPosts(limit = 12, page = 1, tag) {}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
