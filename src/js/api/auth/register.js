import {API_AUTH_REGISTER} from "../constants.js";

export async function register({name, email, password, bio, banner, avatar}) {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  const requiredData = {name, email, password};

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
      return {error: errorResponse.error || 'Registration failed'};
    }

    return await response.json();
  } catch (error) {
    console.error('Error during registration:', error);
    return {error: error.message};
  }
}
