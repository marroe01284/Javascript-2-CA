import {register} from "../../api/auth/register.js";

/*export async function onRegister(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const registerData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        bio: formData.get('bio') || '',
        banner: formData.get('banner') || '',
        avatar: formData.get('avatar') || ''
    };

    const result = await register(registerData);

    if (result && !result.error) {
        alert('Registration successful. Redirecting to login..');
        window.location.href = "";
    } else {
        alert('Registration failed: ' + (result.error || 'An unknown error occurred.'));
    }
}*/

export async function onRegister(event) {
    event.preventDefault();

    const registerData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        bio: document.getElementById('bio') ? document.getElementById('bio').value : null,
        banner: document.getElementById('banner') ? document.getElementById('banner').value : null,
        avatar: document.getElementById('avatar') ? document.getElementById('avatar').value : null,
    };

    try {
        const result = await register(registerData);
        if (result) {
            alert('Registration successful! Redirecting you to login...');
            window.location.href = '/auth/login/';
        }
    } catch (error) {
        console.error(error);
        alert(`Registration failed: ${error.message}`);
    }
}
