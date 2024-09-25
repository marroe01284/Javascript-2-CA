import { updateProfile } from "../../api/profile/update";

export async function onUpdateProfile(event) {

    event.preventDefault();

    const form = event.target;
    const bio = form.bio.value;
    const banner = form.banner.value; 
    const avatar = form.avatar.value;
  
    try {
      await updateProfile(bio, {avatar,banner});
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
}
