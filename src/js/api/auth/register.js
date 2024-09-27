import { API_AUTH_REGISTER } from "../constants.js";

/**
 * Registers a new user by sending a POST request with the required and optional data.
 *
 * @async
 * @function register
 * @param {Object} userData - The user data to register.
 * @param {string} userData.name - The user's name.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @param {string} [userData.bio] - The user's bio (optional).
 * @param {Object} [userData.banner] - The user's banner image object (optional).
 * @param {string} [userData.banner.url] - The URL of the banner image (optional).
 * @param {string} [userData.banner.alt] - The alt text for the banner image (optional).
 * @param {Object} [userData.avatar] - The user's avatar image object (optional).
 * @param {string} [userData.avatar.url] - The URL of the avatar image (optional).
 * @param {string} [userData.avatar.alt] - The alt text for the avatar image (optional).
 * @returns {Promise<Object>} A promise that resolves to the server response or an error object.
 * @throws Will return an error object if the registration fails or if a network error occurs.
 */
export async function register({ name, email, password, bio, banner, avatar }) {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const requiredData = { name, email, password };

  if (bio) requiredData.bio = bio;
  if (banner) requiredData.banner = banner;
  if (avatar) requiredData.avatar = avatar;

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(requiredData),
  };

  try {
    const response = await fetch(API_AUTH_REGISTER, requestOptions);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Registration failed:', errorResponse);
      return { error: errorResponse.error || 'Registration failed' };
    }

    return await response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    return { error: error.message };
  }
}
