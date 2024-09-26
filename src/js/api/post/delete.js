import {API_SOCIAL_POSTS, API_KEY} from "../constants";
import {getKey} from "../auth/key";

export async function deletePost(id) {
  const myHeaders = new Headers();

  myHeaders.append("X-Noroff-API-Key", API_KEY);

  const token = await getKey();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };

  try {
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
