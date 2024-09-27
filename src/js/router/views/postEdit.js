import { readPost } from '../../api/post/read';
import { updatePost } from '../../api/post/update';
import { setLogoutListener } from '../../ui/global/logout';

document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
    renderEditForm();
});

function getPostIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('postID');
}

async function renderEditForm() {
    const postID = getPostIDFromURL();
    console.log('Post ID for editing:', postID);

    try {
        // Fetch the post data using the postID
        const post = await readPost(postID);
        console.log('Post data for editing:', post);

        // Populate the form fields with the post data
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

function displayError(message) {
    const formContainer = document.getElementById('edit-post-form-container');
    formContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

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
        // Send the updated post data to the server
        await updatePost(postID, updatedPost);
        alert('Post updated successfully!');

        // Redirect back to the post page
        window.location.href = `/post/?postID=${postID}`;
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post. Please try again.');
    }
});
