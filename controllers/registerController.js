class RegisterController {
    constructor(userManager) {
        this.userManager = userManager;
    }

    render = () => {
        let form = document.querySelector('#register-form');
        let registerName = document.querySelector('#register-username');
        let registerPassInput = document.querySelector('#register-password');

        form.onsubmit = (e) => {
            e.preventDefault();
            let username = registerName.value;
            let password = registerPassInput.value;

            this.verifyPassword()
                .then(() => {
                    this.userManager.register({ username, password })
                    location.hash = 'login';
                })
                .catch(err => alert(err));


        }
    }

    verifyPassword = () => {
        let registerName = document.querySelector('#register-username');
        let registerPassInput = document.querySelector('#register-password');
        let registerPassConfirm = document.querySelector('#confirm-pass');


        return new Promise((resolve, reject) => {

            if (!this.userManager.isNameTaken(registerName.value)) {
                reject("This username is taken");
            };

            let specialChars = "!@#$%^&*(),.?\":{}|<>";

            let hasSpecialChar = false;
            let hasUppercaseChar = false;
            let hasLowercaseChar = false;

            for (let i = 0; i < registerPassInput.value.length; i++) {
                let char = registerPassInput.value.charAt(i);

                if (specialChars.indexOf(char) !== -1) {
                    hasSpecialChar = true;
                } else if (char === char.toUpperCase()) {
                    hasUppercaseChar = true;
                } else if (char === char.toLowerCase()) {
                    hasLowercaseChar = true;
                }
            }

            let isLongEnough = registerPassConfirm.value.length >= 6;

            if (registerPassInput.value !== registerPassConfirm.value) {
                reject("Passwords do not match");
            }

            if (!hasSpecialChar || !hasUppercaseChar || !hasLowercaseChar || !isLongEnough) {
                reject("Password should be at least 6 characters long and contain at least one special character, one uppercase letter, and one lowercase letter");
            }

            resolve();
        });
    }
}