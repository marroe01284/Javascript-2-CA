import { deletePost } from '../../api/post/delete';

/**
 * Handles the deletion of a post.
 *
 * @async
 * @function onDeletePost
 * @param {string} postID - The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves once the post is deleted.
 * @throws Will log an error and display an error message if post deletion fails.
 */
export async function onDeletePost(postID) {
    if (!confirm('Are you sure you want to delete this post?')) {
        return;
    }

    try {
        await deletePost(postID);
        alert('Post deleted successfully!');
        window.location.reload();
    } catch (error) {
        console.error('Error deleting post:', error);
        displayError('Failed to delete post.');
    }
}

/**
 * Displays an error message on the page.
 *
 * @function displayError
 * @param {string} message - The error message to display.
 * @returns {void}
 */
function displayError(message) {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
    }
}
