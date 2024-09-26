import { authGuard } from "../../utilities/authGuard";
import { setLogoutListener } from '../../ui/global/logout';
import { readProfile } from '../../api/profile/read';
import { readPostsByUser } from '../../api/post/read';
import { onDeletePost } from "../../ui/post/delete";

document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
});

authGuard();

function getAuthorIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('authorID');
}

function getLoggedInUserName() {
    return localStorage.getItem('userID');
}

const authorID = getAuthorIDFromURL();
const loggedInUserName = getLoggedInUserName();
const isOwnProfile = !authorID || authorID === loggedInUserName;

function toggleEditProfileSections(isOwnProfile) {
    const editProfileSection = document.getElementById('editProfileSection');
    const updateProfileForm = document.getElementById('updateProfileForm');

    if (editProfileSection && updateProfileForm) {
        if (isOwnProfile) {
            editProfileSection.style.display = 'block';
            updateProfileForm.style.display = 'none';
        } else {
            editProfileSection.style.display = 'none';
            updateProfileForm.style.display = 'none';
        }
    } else {
        console.warn('Edit profile elements not found in the DOM.');
    }
}

toggleEditProfileSections(isOwnProfile);

if (isOwnProfile) {
    const editProfileButton = document.getElementById('editProfileButton');
    const updateProfileForm = document.getElementById('updateProfileForm');

    if (editProfileButton && updateProfileForm) {
        function toggleUpdateProfileForm() {
            if (updateProfileForm.style.display === 'none' || updateProfileForm.style.display === '') {
                updateProfileForm.style.display = 'block';
            } else {
                updateProfileForm.style.display = 'none';
            }
        }
        editProfileButton.addEventListener('click', toggleUpdateProfileForm);
    } else {
        console.warn('Edit profile button or update profile form not found.');
    }
}

async function loadProfile() {
    const username = isOwnProfile ? loggedInUserName : authorID;
    try {
        const profileData = await readProfile(username);
        displayProfileData(profileData);
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
}

loadProfile();

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

function displayProfileData(profileData) {
    const profileContainer = document.getElementById('profileContainer');
    const profileBannerImage = document.getElementById('profileBannerImage');

    const profileName = escapeHTML(profileData.name || 'Anonymous');
    const profileAvatar = (profileData.avatar && profileData.avatar.url) ? profileData.avatar.url : '/images/default-avatar.png';
    const profileBio = escapeHTML(profileData.bio || '');

    const profileBanner = (profileData.banner && profileData.banner.url) ? profileData.banner.url : '/images/default-banner.png';
    profileBannerImage.src = profileBanner;
    profileBannerImage.alt = 'Profile Banner';

    const profileHTML = `
      <img class="profile-image" src="${profileAvatar}" alt="${profileName}'s Avatar">
      <h2 class="profile-name">${profileName}</h2>
      <p class="profile-bio">${profileBio}</p>
      ${isOwnProfile ? `
      <div class="profile-edit" id="editProfileSection">
        <button id="editProfileButton">Edit profile</button>
      </div>
      <form name="updateProfile" id="updateProfileForm" style="display: none;">
        <div>
          <label for="bio">Bio</label>
          <input id="bio" type="text" name="bio" required value="${profileBio}" />
        </div>
        <div>
          <label for="avatar">Avatar URL</label>
          <input id="avatar" type="text" name="avatar" required value="${escapeHTML(profileData.avatar && profileData.avatar.url ? profileData.avatar.url : '')}" />
        </div>
        <div>
          <label for="banner">Banner URL</label>
          <input id="banner" type="text" name="banner" required value="${escapeHTML(profileData.banner && profileData.banner.url ? profileData.banner.url : '')}" />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      ` : ''}
    `;

    profileContainer.innerHTML = profileHTML;

    if (isOwnProfile) {
        const editProfileButton = document.getElementById('editProfileButton');
        const updateProfileForm = document.getElementById('updateProfileForm');

        if (editProfileButton && updateProfileForm) {
            function toggleUpdateProfileForm() {
                if (updateProfileForm.style.display === 'none' || updateProfileForm.style.display === '') {
                    updateProfileForm.style.display = 'block';
                } else {
                    updateProfileForm.style.display = 'none';
                }
            }

            editProfileButton.addEventListener('click', toggleUpdateProfileForm);
        } else {
            console.warn('Edit profile button or update profile form not found.');
        }
    }
}

async function loadUserPosts() {
    const username = isOwnProfile ? loggedInUserName : authorID;
    try {

        const response = await readPostsByUser(username, 12, 1);
        const userPosts = response.data || response;
        displayUserPosts(userPosts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
    }
}
loadUserPosts();

function displayUserPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postMedia = post.media && post.media.url
            ? `<img class="post-media" src="${post.media.url}" alt="${post.media.alt || 'Post media'}">`
            : '';

        const authorAvatar = post.author.avatar && post.author.avatar.url
            ? `<img class="author-img" src="${post.author.avatar.url}" alt="${post.author.name}'s avatar">`
            : '<img class="author-img" src="/images/default-avatar.png" alt="Default avatar">';

        const deleteButtonHTML = isOwnProfile
            ? `<button class="delete-btn" data-post-id="${post.id}">Delete</button>`
            : '';

        const postHTML = `
        <div class="post">
          <div class="author" data-authorID="${post.author.name}">
          ${authorAvatar}
            <span class="author-name">${post.author.name}</span>
          </div>
          <a href="/post/?postID=${post.id}" data-postID="${post.id}">
            ${postMedia}
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
          </a>
          ${deleteButtonHTML}
        </div>
      `;
        postsContainer.innerHTML += postHTML;
    });

    if (isOwnProfile) {
        const deleteButtons = document.querySelectorAll(".delete-btn")
        deleteButtons.forEach(button => {
            const postID = button.dataset.postId;
            button.addEventListener('click', function() {
                console.log("You clicked me!")
                console.log(postID)
                onDeletePost(postID);

            });
        });
    }
}
