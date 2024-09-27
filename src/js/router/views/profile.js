import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from '../../ui/global/logout';
import { readProfile } from '../../api/profile/read';
import { readPostsByUser } from '../../api/post/read';
import { onDeletePost } from "../../ui/post/delete";
import { onUpdateProfile } from '../../ui/profile/update';

document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
});

authGuard();

/**
 * Escapes special characters in a string to prevent XSS attacks.
 *
 * @function escapeHTML
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, function (tag) {
        const charsToReplace = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;',
        };
        return charsToReplace[tag] || tag;
    });
}

/**
 * Loads and displays the profile data for the current user or another user.
 *
 * @async
 * @function loadProfile
 * @returns {Promise<void>} A promise that resolves when the profile is loaded and displayed.
 * @throws Will log an error if profile data fetching fails.
 */
async function loadProfile() {
    const authorID = getAuthorIDFromURL();
    const loggedInUserName = getLoggedInUserName();
    const isOwnProfile = !authorID || authorID === loggedInUserName;
    const username = isOwnProfile ? loggedInUserName : authorID;

    try {
        const profileResponse = await readProfile(username);
        const profileData = profileResponse.data;

        displayProfileData(profileData, isOwnProfile);
        toggleEditProfileSections(isOwnProfile);
        loadUserPosts(isOwnProfile);
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

loadProfile();

/**
 * Retrieves the author ID from the URL query parameters.
 *
 * @function getAuthorIDFromURL
 * @returns {string|null} The author ID from the URL or null if not found.
 */
function getAuthorIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('authorID');
}

/**
 * Retrieves the logged-in user's ID from local storage.
 *
 * @function getLoggedInUserName
 * @returns {string|null} The logged-in user's ID or null if not found.
 */
function getLoggedInUserName() {
    return localStorage.getItem('userID');
}

/**
 * Toggles the visibility of the edit and update profile sections based on ownership of the profile.
 *
 * @function toggleEditProfileSections
 * @param {boolean} isOwnProfile - Whether the profile belongs to the logged-in user.
 * @returns {void}
 */
function toggleEditProfileSections(isOwnProfile) {
    const editProfileSection = document.getElementById('editProfileSection');
    const updateProfileForm = document.getElementById('updateProfileForm');

    if (editProfileSection && updateProfileForm) {
        if (isOwnProfile) {
            editProfileSection.style.display = 'block';
            updateProfileForm.style.display = 'none';

            const editProfileButton = document.getElementById('editProfileButton');
            if (editProfileButton) {
                editProfileButton.addEventListener('click', () => {
                    updateProfileForm.style.display = updateProfileForm.style.display === 'none' || !updateProfileForm.style.display ? 'block' : 'none';
                });
            }
        } else {
            editProfileSection.style.display = 'none';
            updateProfileForm.style.display = 'none';
        }
    }
}

/**
 * Displays the user's profile data on the page.
 *
 * @function displayProfileData
 * @param {Object} profileData - The profile data to display.
 * @param {boolean} isOwnProfile - Whether the profile belongs to the logged-in user.
 * @returns {void}
 */
function displayProfileData(profileData = {}, isOwnProfile) {
    const profileContainer = document.getElementById('profileContainer');
    const profileBannerImage = document.getElementById('profileBannerImage');

    const profileName = escapeHTML(profileData.name || 'Anonymous');
    const profileAvatar = profileData.avatar && profileData.avatar.url ? profileData.avatar.url : '/images/default-avatar.png';
    const profileBio = escapeHTML(profileData.bio || '');

    const profileBanner = profileData.banner && profileData.banner.url ? profileData.banner.url : '/images/default-banner.png';

    profileBannerImage.src = profileBanner;
    profileBannerImage.alt = profileData.banner && profileData.banner.alt ? profileData.banner.alt : 'Profile Banner';

    const profileHTML = `
      <img class="profile-image" src="${profileAvatar}" alt="${profileName}'s Avatar">
      <h2 class="profile-name">${profileName}</h2>
      <p class="profile-bio">${profileBio}</p>
    `;

    profileContainer.innerHTML = profileHTML;

    if (isOwnProfile) {
        const updateProfileForm = document.getElementById('updateProfileForm');
        if (updateProfileForm) {
            updateProfileForm.addEventListener('submit', onUpdateProfile);
        }
    }
}

/**
 * Loads and displays the user's posts.
 *
 * @async
 * @function loadUserPosts
 * @param {boolean} isOwnProfile - Whether the posts belong to the logged-in user.
 * @returns {Promise<void>} A promise that resolves when the posts are loaded and displayed.
 * @throws Will log an error if posts fetching fails.
 */
async function loadUserPosts(isOwnProfile) {
    const username = isOwnProfile ? getLoggedInUserName() : getAuthorIDFromURL();

    try {
        const response = await readPostsByUser(username, 12, 1);
        const userPosts = response.data || response;
        displayUserPosts(userPosts, isOwnProfile);
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}

/**
 * Displays the user's posts on the page.
 *
 * @function displayUserPosts
 * @param {Array} posts - The array of posts to display.
 * @param {boolean} isOwnProfile - Whether the posts belong to the logged-in user.
 * @returns {void}
 */
function displayUserPosts(posts, isOwnProfile) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    posts.forEach(post => {
        const postHTML = `
        <div class="post">
          <div class="author" data-authorID="${post.author.name}">
            <img class="author-img" src="${post.author.avatar?.url || '/images/default-avatar.png'}" alt="${post.author.name}'s avatar">
            <span class="author-name">${post.author.name}</span>
          </div>
          <a class="profile-posts" href="/post/?postID=${post.id}" data-postID="${post.id}">
            <img class="post-media" src="${post.media?.url || ''}" alt="${post.media?.alt || 'Post media'}">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
          </a>
          ${isOwnProfile ? `<button class="delete-btn" data-post-id="${post.id}">Delete</button>` : ''}
        </div>`;
        postsContainer.innerHTML += postHTML;
    });

    if (isOwnProfile) {
        document.querySelectorAll(".delete-btn").forEach(button => {
            const postID = button.dataset.postId;
            button.addEventListener('click', () => {
                onDeletePost(postID);
            });
        });
    }
}
