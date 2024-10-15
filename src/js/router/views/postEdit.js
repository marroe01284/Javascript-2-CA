import { readPost } from '../../api/post/read';
import { updatePost } from '../../api/post/update';
import { setLogoutListener } from '../../ui/global/logout';

document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
    renderEditForm();
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
 * Fetches the post data using the post ID and populates the form with the post's current values.
 *
 * @async
 * @function renderEditForm
 * @returns {Promise<void>} A promise that resolves once the form is populated with post data.
 * @throws Will display an error message if the post data cannot be fetched.
 */
async function renderEditForm() {
    const postID = getPostIDFromURL();
    console.log('Post ID for editing:', postID);

    try {
        const post = await readPost(postID);
        console.log('Post data for editing:', post);

        document.getElementById('title').value = post.title;
        document.getElementById('body').value = post.body;
        document.getElementById('tags').value = post.tags ? post.tags.join(', ') : ''; // Assuming tags are comma-separated
        document.getElementById('media-url').value = post.media?.url || '';
        document.getElementById('media-alt').value = post.media?.alt || '';

    } catch (error) {
        console.error('Error fetching post data for editing:', error);
        displayError('Failed to load post for editing. Please try again later.');
    }
}

/**
 * Displays an error message in the form container.
 *
 * @function displayError
 * @param {string} message - The error message to display.
 * @returns {void}
 */
function displayError(message) {
    const formContainer = document.getElementById('edit-post-form-container');
    formContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

/**
 * Handles form submission, gathers the updated post data, and sends it to the server for updating.
 *
 * @async
 * @function onSubmit
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the post is successfully updated.
 * @throws Will alert the user if the post update fails.
 */
document.getElementById('editPostForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const postID = getPostIDFromURL();
    const updatedPost = {
        title: document.getElementById('title').value,
        body: document.getElementById('body').value,
        tags: document.getElementById('tags').value.split(',').map(tag => tag.trim()), // Split tags by commas
        media: {
            url: document.getElementById('media-url').value,
            alt: document.getElementById('media-alt').value,
        }
    };

    try {
        await updatePost(postID, updatedPost);
        alert('Post updated successfully!');
        window.location.href = `/post/?postID=${postID}`;
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post. Please try again.');
    }
});
