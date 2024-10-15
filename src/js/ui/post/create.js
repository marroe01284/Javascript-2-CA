import { createPost } from "../../api/post/create";

/**
 * Handles the post creation form submission.
 *
 * @async
 * @function onCreatePost
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves once the post is created.
 * @throws Will log an error if the post creation fails.
 */
export async function onCreatePost(event) {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const body = form.post.value;
    const media = form.image.value;
    const tags = form.tags.value;

    try {
        await createPost({ title, body, tags, media });
        console.log("Post created successfully!");
    } catch (error) {
        console.error("Error creating post:", error);  
    }
}
