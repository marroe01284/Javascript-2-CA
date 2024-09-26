import { API_SOCIAL_POSTS, API_KEY } from "../constants";
import { getKey } from "../auth/key";

/**
 * Deletes a post by its ID.
 *
 * @param {string} postID - The ID of the post to delete.
 * @returns {Promise<void>} A promise that resolves if the delete request is successful.
 * @throws Will throw an error if the network request fails.
 */
export async function deletePost(id) {
  const myHeaders = new Headers();
  
  // Add API key to the headers
  myHeaders.append("X-Noroff-API-Key", API_KEY);

  // Get the token from local storage or auth function
  const token = await getKey(); 
  myHeaders.append("Authorization", `Bearer ${token}`);

  // Request options with DELETE method
  const requestOptions = {
    method: "DELETE", // Set the method to DELETE
    headers: myHeaders,
    redirect: "follow"
  };

  try {
    // Send DELETE request to the API with the post ID
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to delete post: ${response.statusText}`);
    }

    console.log('Post deleted successfully');
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}
