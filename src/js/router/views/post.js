import {readPost} from '../../api/post/read';
import {setLogoutListener} from '../../ui/global/logout';
import {onDeletePost} from "../../ui/post/delete";
document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
    renderPost();
});
/**
 * Retrieves the post ID from the URL query parameters.
 *
 * @function getPostIDFromURL
 * @returns {string|null} The post ID retrieved from the URL or null if not found.
 */
function getPostIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('postID');
}
/**
 * Retrieves the logged-in user's username from local storage.
 *
 * @function getLoggedInUserName
 * @returns {string|null} The logged-in user's username or null if not found.
 */
function getLoggedInUserName() {
    return localStorage.getItem('userID');
}
/**
 * Fetches and renders the post by its ID.
 *
 * @async
 * @function renderPost
 * @returns {Promise<void>} A promise that resolves once the post is rendered.
 * @throws Will display an error message if the post cannot be fetched.
 */

async function renderPost() {
    const postID = getPostIDFromURL();
    console.log('Post ID:', postID);

    try {
        const post = await readPost(postID);
        console.log('Post Data:', post);

        const loggedInUserName = getLoggedInUserName();
        const isOwnProfile = post.author.name === loggedInUserName;

        const postContainer = document.getElementById('post-container');
        postContainer.innerHTML = '';

        const postMedia = post.media && post.media.url
            ? `<img class="post-media" src="${post.media.url}" alt="${post.media.alt || 'Post media'}">`
            : '';

        const authorAvatar = post.author && post.author.avatar && post.author.avatar.url
            ? `<img class="author-img" src="${post.author.avatar.url}" alt="${post.author.name}'s avatar">`
            : '<img class="author-img" src="/images/default-avatar.png" alt="Default avatar">';

        const postHTML = `
        <div class="post">
            <div class="author" data-authorID="${post.author.name}">
                ${authorAvatar}
                <span class="author-name">${post.author.name}</span>
            </div>
            <div class="post-content">
                ${postMedia}
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
            ${isOwnProfile ? `
                <div class="post-actions">
                    <button class="delete-btn" data-post-id="${post.id}">Delete</button>
                    <a href="/post/edit/?postID=${post.id}">Edit</a>
                </div>
            ` : ''}
        </div>
        `;

        postContainer.innerHTML += postHTML;

        if (isOwnProfile) {
            const deleteButton = postContainer.querySelector('.delete-btn');
            deleteButton.addEventListener('click', () => {
                onDeletePost(post.id);
            });
        }
    } catch (error) {
        console.error('Error fetching post:', error);
        displayError('Failed to load post. Please try again later.');
    }
}
/**
 * Displays an error message in the post container.
 *
 * @function displayError
 * @param {string} message - The error message to display.
 * @returns {void}
 */
function displayError(message) {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

renderPost()
