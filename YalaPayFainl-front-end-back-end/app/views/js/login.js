import userRepo from "./repository/user-repository.js";

const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", login);



function formToObject(form) {
    const formData = new FormData(form);
    const formObject = {};
    for (const [key, value] of formData) {
        formObject[key] = value;
    }
    return formObject;
}

async function login(e) {
    e.preventDefault();
    const userLogin = formToObject(e.target);
    console.log(userLogin)
    // Poorly done, login validation should be done by Indexed DB
    const user = await userRepo.getUser(userLogin.email,userLogin.password);
    console.log(user);

    if (user) {
        sessionStorage.setItem("name", `${user.firstName} ${user.lastName}`);
        alert("logging done successfully");
        window.location = "dashboard.html";
    } else {
        alert("Wrong email or password! \nPlease try again");
        loginForm.reset();
    }
}
