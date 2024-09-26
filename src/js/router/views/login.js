import {onLogin} from "../../ui/auth/login"
import {setLogoutListener} from "../../ui/global/logout.js";

document.addEventListener("DOMContentLoaded", () => {
    setLogoutListener();
});

const form = document.forms.login;

if (form) {
    form.addEventListener('submit', onLogin);
} else {
    console.log('Login failed.');
}

form.addEventListener("submit", onLogin);
