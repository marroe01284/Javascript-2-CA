import {authGuard} from "../../utilities/authGuard";
import {setLogoutListener} from '../../ui/global/logout';
import {readProfile} from '../../api/profile/read';
import {readPostsByUser} from '../../api/post/read';
import {onDeletePost} from "../../ui/post/delete";
import {onUpdateProfile} from '../../ui/profile/update';

document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
});

authGuard();

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

function getAuthorIDFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('authorID');
}

function getLoggedInUserName() {
    return localStorage.getItem('userID');
}

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
          <a href="/post/?postID=${post.id}" data-postID="${post.id}">
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
