// ui/post/delete.js
import { deletePost } from '../../api/post/delete';

export async function onDeletePost(postID) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return; // Exit if the user cancels the deletion
    }

    try {
        await deletePost(postID); // Call the API function to delete the post
        alert('Post deleted successfully!');
        window.location.reload(); // Reload the page to refresh the posts list after deletion
    } catch (error) {
        console.error('Error deleting post:', error);
        displayError('Failed to delete post.');
    }
}

function displayError(message) {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
    }
}
