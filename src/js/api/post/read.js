import { API_SOCIAL_POSTS, API_KEY, API_SOCIAL_PROFILES } from "../constants";
import { getKey } from "../auth/key";

/**
 * Fetches a post by its ID.
 *
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<Object>} A promise that resolves to the post data.
 */
export async function readPost(id) {
  const myHeaders = new Headers();
  myHeaders.append("X-Noroff-API-Key", API_KEY); 

  const token = await getKey(); 
  myHeaders.append("Authorization", `Bearer ${token}`); 

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}?_author=true`, requestOptions);
    
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

/**
 * Fetches a list of posts with pagination.
 *
 * @param {number} [limit=12] - The number of posts to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @returns {Promise<Object>} A promise that resolves to an object containing posts and pagination info.
 * @throws Will throw an error if the network request fails.
 */
export async function readPosts(limit = 12, page = 1,) {
  const myHeaders = new Headers();
  myHeaders.append("X-Noroff-API-Key", API_KEY); 

  const token = await getKey(); 
  myHeaders.append("Authorization", `Bearer ${token}`); 

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS+`?limit=${limit}&page=${page}&_author=true`, requestOptions);
    
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

/**
 * Fetches posts created by a specific user, with optional pagination and tag filtering.
 *
 * @param {string} username - The username of the author whose posts to retrieve.
 * @param {number} [limit=12] - The number of posts to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {string} [tag] - An optional tag to filter the posts by.
 * @returns {Promise<Object>} A promise that resolves to an object containing the user's posts.
 * @throws Will throw an error if the network request fails.
 */
export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  const myHeaders = new Headers();
  myHeaders.append("X-Noroff-API-Key", API_KEY);

  const token = await getKey();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let queryParams = `?limit=${limit}&page=${page}&_author=true`;

  if (tag) {
    queryParams += `&tag=${encodeURIComponent(tag)}`;
  }

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const apiUrl = `${API_SOCIAL_PROFILES}/${encodeURIComponent(username)}/posts${queryParams}`;

    const response = await fetch(apiUrl, requestOptions);

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