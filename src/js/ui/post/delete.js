import {deletePost} from '../../api/post/delete';

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

function displayError(message) {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.textContent = message;
        errorMessageElement.style.display = 'block';
    }
}
