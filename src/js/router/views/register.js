import {onRegister} from "../../ui/auth/register";
import {setLogoutListener} from "../../ui/global/logout.js";

document.addEventListener("DOMContentLoaded", () => {
    setLogoutListener();
});

const form = document.forms.register;

form.addEventListener("submit", onRegister);
