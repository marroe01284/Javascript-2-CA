import {authGuard} from "../../utilities/authGuard";
import {readPosts} from "../../api/post/read";
import {setLogoutListener} from '../../ui/global/logout';

authGuard();
document.addEventListener('DOMContentLoaded', () => {
  setLogoutListener();
});

const postsContainer = document.getElementById("posts-container");

async function renderPosts() {
  try {
    const response = await readPosts();
    const posts = response.data;

    postsContainer.innerHTML = '';

    posts.forEach(post => {
      const postMedia = post.media
          ? `<img class="post-media" src="${post.media.url}" alt="${post.media.alt || 'Post media'}">`
          : '';

      const authorAvatar = post.author.avatar
          ? `<img class="author-img" src="${post.author.avatar.url}" alt="${post.author.name}'s avatar">`
          : '';

      const postElement = document.createElement('div');
      postElement.classList.add('post');

      postElement.innerHTML = `
        <a href="profile/?authorID=${post.author.name}" class="author-link" data-authorID="${post.author.name}">
        ${authorAvatar}
          <span class="author-name">${post.author.name}</span>
        </a>
        <a href="/post/?postID=${post.id}" data-postID="${post.id}">
          ${postMedia}
          <h2 class="post-title">${post.title}</h2>
          <p class="post-body">${post.body}</p>
        </a>
      `;
      postsContainer.appendChild(postElement);
    });

  } catch (error) {
    console.error("Error rendering posts:", error);
  }
}

renderPosts();
