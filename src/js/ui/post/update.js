// src/js/ui/post/update.js
import { updatePost } from '../../api/post/update'; // Import the API call for updating a post

// Function to handle updating the post
export async function onUpdatePost(event) {
    event.preventDefault(); // Prevent the default form submission

    const postID = getPostIDFromURL(); // Assuming you have a function to get the post ID from the URL
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim()); // Convert tags to an array
    const mediaUrl = document.getElementById('media-url').value;
    const mediaAlt = document.getElementById('media-alt').value;

    // Construct the updated post object
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
        // Send the updated post data via the API
        await updatePost(postID, updatedPost);
        alert('Post updated successfully!');

        // Redirect to the post page or another relevant page after updating
        window.location.href = `/post/?postID=${postID}`;
    } catch (error) {
        console.error('Error updating post:', error);
        alert('Failed to update post.');
    }
}

// Helper function to get the post ID from the URL
function getPostIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('postID');
}

