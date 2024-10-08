import {API_SOCIAL_POSTS, API_KEY, API_SOCIAL_PROFILES} from "../constants";
import {getKey} from "../auth/key";

/**
 * Fetches a single post by its ID.
 *
 * @async
 * @function readPost
 * @param {string} id - The ID of the post to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the post data.
 * @throws Will throw an error if the fetch operation fails.
 */
export async function readPost(id) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);

    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const headerOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true`, headerOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch post: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);
        return result.data;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

export async function readPosts(limit = 12, page = 1,) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);

    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const headerOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(API_SOCIAL_POSTS + `?limit=${limit}&page=${page}&_author=true`, headerOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);

    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let queryParams = `?limit=${limit}&page=${page}&_author=true`;

    if (tag) {
        queryParams += `&tag=${encodeURIComponent(tag)}`;
    }

    const headerOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const apiUrl = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}/posts${queryParams}`;

        const response = await fetch(apiUrl, headerOptions);

        if (!response.ok) {
            throw new Error(`Failed to fetch posts for user ${username}: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching posts by user:", error);
        throw error;
    }
}