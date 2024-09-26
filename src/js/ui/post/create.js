import {createPost} from "../../api/post/create";

export async function onCreatePost(event) {
    event.preventDefault();

    const form = event.target;
    const title = form.title.value;
    const body = form.post.value;
    const media = form.image.value;
    const tags = form.tags.value;

    try {
        await createPost({title, body, tags, media});
        console.log("Post created successfully!");
    } catch (error) {
        console.error("Error creating post:", error);
    }
}
