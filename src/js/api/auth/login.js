import {API_AUTH_LOGIN, API_KEY} from "../constants.js";

export async function login({ email, password }) {}

export async function apiLogin({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Noroff-API-Key': API_KEY,
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            return {error: 'Login failed.'};
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return {error: error.message};
    }
}

/*const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVG9tX0NocmlzdGVyX1MiLCJlbWFpbCI6InRvbWNocmlzdGVyMTk5NUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTcyNzE3MDA4Mn0.SxibC693N--JpYxn_Mf3zkajhI1PBzYQdMp3RcHWx3Q';

const apiKey = 'be9052e7-bb3f-4b31-88fd-80fe785919c7'*/
