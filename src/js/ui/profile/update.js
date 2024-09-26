import {updateProfile} from '../../api/profile/update';

export async function onUpdateProfile(event) {
    event.preventDefault();

    const bio = document.getElementById('bio').value;
    const avatarUrl = document.getElementById('avatar-url').value;
    const avatarAlt = document.getElementById('avatar-alt').value;
    const bannerUrl = document.getElementById('banner-url').value;
    const bannerAlt = document.getElementById('banner-alt').value;

    const updatedProfile = {
        bio: bio || "",
        avatar: {
            url: avatarUrl || "",
            alt: avatarAlt || ""
        },
        banner: {
            url: bannerUrl || "",
            alt: bannerAlt || ""
        }
    };

    try {
        await updateProfile(updatedProfile);
        alert('Profile updated successfully!');

        window.location.reload();
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
}
