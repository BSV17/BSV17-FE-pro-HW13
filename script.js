"use strict";

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const submitButton = document.querySelector("form .login-form-submit");

const validInputs = {};

function validateEmail (email) {
    let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z\-])+\.)+([a-zA-Z]{2,3})+$/;
    return regex.test(String(email).toLowerCase());
}

function validatePassword (password) {
    let regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    console.log(password);
    return regex.test(password);
}

inputs.forEach((input) => {
    input.addEventListener("blur", () => {
        const inputValue = input.value;
        const inputName = input.name;
        const isValid = inputName === "email" ? validateEmail(inputValue) : validatePassword(inputValue);

        if(!isValid) {
            input.classList.add("error");
            delete validInputs[inputName];
        } else {
            validInputs[inputName] = inputValue;
            input.classList.remove("error");
        }

        submitButton.disabled = Object.keys(validInputs).length !== 2;
    });
});

form.addEventListener("submit", event => {
    event.preventDefault();

    console.log({
        email: form.elements["email"].value,
        password: form.elements["password"].value
    });

    inputs.forEach((input) => {
        input.value = "";
    });
});
