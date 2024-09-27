import {API_SOCIAL_POSTS} from "../constants";
import {getKey} from "../auth/key";
import {headers as createdHeaders} from "../headers";
/**
 * Creates a new post by sending a POST request with the title, body, tags, and media.
 *
 * @async
 * @function createPost
 * @param {Object} postData - The data for the new post.
 * @param {string} postData.title - The title of the post.
 * @param {string} postData.body - The content of the post.
 * @param {string|string[]} [postData.tags] - Tags related to the post (optional).
 * @param {string} [postData.media] - The URL of the media for the post (optional).
 * @returns {Promise<void>} A promise that resolves if the post is created successfully, or throws an error.
 * @throws Will return an error object if the post creation fails or a network error occurs.
 */
export async function createPost({title, body, tags, media}) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const token = await getKey();
    myHeaders.append('Authorization', `Bearer ${token}`);

    const apiKeyHeader = createdHeaders();
    const [key, value] = apiKeyHeader.entries().next().value;
    myHeaders.append(key, value);

    const postData = {
        title: title,
        body: body,
    };
    if (tags) {
        postData.tags = [tags];
    }
    if (media) {
        postData.media = {
            url: media,
            alt: "My alt text",
        };
    }

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(postData),
        redirect: 'follow'
    };
    try {
        const response = await fetch(API_SOCIAL_POSTS, requestOptions);
        const result = await response.json();
        if (response.ok) {
            alert("Poost created!");
            window.location.href = "/";
        } else {
            alert("Post not created");
        }

    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
}