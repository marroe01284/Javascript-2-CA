import {onCreatePost} from "../../ui/post/create";
import {authGuard} from "../../utilities/authGuard";

authGuard();
/**
 * Attaches a submit event listener to the create post form.
 * When the form is submitted, the `onCreatePost` function is triggered.
 *
 * @function
 * @returns {void}
 */
const form = document.forms.createPost;

form.addEventListener("submit", onCreatePost);
