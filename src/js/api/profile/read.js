import {API_SOCIAL_PROFILES, API_KEY} from "../constants";
import {getKey} from "../auth/key";

export async function readProfile(username) {
    const myHeaders = new Headers();
    myHeaders.append("X-Noroff-API-Key", API_KEY);

    const token = await getKey();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
}

export async function readProfiles(limit, page) {
}
