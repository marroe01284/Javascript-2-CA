// ui/profile/update.js
import { updateProfile } from '../../api/profile/update';

export async function onUpdateProfile(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the form elements using their IDs
    const bio = document.getElementById('bio').value;
    const avatarUrl = document.getElementById('avatar-url').value;
    const avatarAlt = document.getElementById('avatar-alt').value;
    const bannerUrl = document.getElementById('banner-url').value;
    const bannerAlt = document.getElementById('banner-alt').value;

    // Construct the data to send in the PUT request
    const updatedProfile = {
        bio: bio || "", // If empty, send an empty string
        avatar: {
            url: avatarUrl || "",   // If empty, send an empty string
            alt: avatarAlt || ""     // If empty, send an empty string
        },
        banner: {
            url: bannerUrl || "",   // If empty, send an empty string
            alt: bannerAlt || ""    // If empty, send an empty string
        }
    };

    try {
        // Send the updated profile data via the API
        await updateProfile(updatedProfile);
        alert('Profile updated successfully!');

        // Reload the page to reflect the changes
        window.location.reload(); 
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
}
