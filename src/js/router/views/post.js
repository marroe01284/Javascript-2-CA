import { readPost } from "../../api/post/read.js";
import { setLogoutListener } from "../../ui/global/logout.js";

document.addEventListener('DOMContentLoaded', async () => {
    await getPost();
    setLogoutListener();
});

const getPostIdURL = () => {
    const urlString = new URLSearchParams(window.location.search);
    return urlString.get('postId');
}

async function getPost() {
    const postID = getPostIdURL();
    console.log('Post ID: ', postID);

    try {
        const post = await readPost(postID);
        console.log(post);
        displayPost(post);
    } catch (error) {
        console.error('Error fetching post:', error);
    }
}

const displayPost = (post) => {
    if (!post) {
        console.error('Post not found');
        return;
    }

    document.getElementById('#post-inner').innerHTML = `
        <div id="individual-post-title">${post.title}</div>
        <div id="individual-post-content">${post.media.alt.url}</div>
    `;
};
