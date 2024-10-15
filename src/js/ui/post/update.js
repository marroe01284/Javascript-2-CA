
import { updatePost } from '../../api/post/update';
/**
 * Handles the post update form submission.
 *
 * @async
 * @function onUpdatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves once the post is updated.
 * @throws Will display an alert if the post update fails.
 */
export async function onUpdatePost(event) {
    event.preventDefault();

    const postID = getPostIDFromURL();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const mediaUrl = document.getElementById('media-url').value;
    const mediaAlt = document.getElementById('media-alt').value;

    const updatedPost = {
        title: title || "",
        body: body || "",
        tags: tags || [],
        media: {
            url: mediaUrl || "",
            alt: mediaAlt || ""
        }
    };

    try {

        await updatePost(postID, updatedPost);
        alert('Post updated successfully!');


        window.location.href = `/post/?postID=${postID}`;
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post.');
    }
}


function getPostIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('postID');
}

