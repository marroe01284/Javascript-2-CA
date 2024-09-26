import {API_SOCIAL_POSTS} from "../constants";
import {getKey} from "../auth/key";
import {headers as createdHeaders} from "../headers";

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