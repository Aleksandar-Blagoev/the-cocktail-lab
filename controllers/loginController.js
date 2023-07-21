class LoginController {
    constructor(userManager) {
        this.userManager = userManager;
    }

    render = () => {
        let form = document.querySelector('#login-form');
        let loginName = document.querySelector('#login-username');
        let loginPassInput = document.querySelector('#login-password');

        form.onsubmit = (e) => {
            e.preventDefault();
            let username = loginName.value;
            let password = loginPassInput.value;

            this.checkingLogin()
                .then(() => {
                    this.userManager.login({ username, password });
                    location.hash = "coctails";
                })
                .catch(err => alert(err));
        }
    }


    checkingLogin() {
        return new Promise((resolve, reject) => {
            let form = document.querySelector("#login-form");
            let loginUsername = document.querySelector("#login-username");
            let loginPass = document.querySelector("#login-password");
            let button = document.querySelector("#login-button");
            button.disabled = true;

            const checkInputs = () => {
                if (loginUsername.value.trim() !== "" && loginPass.value.trim() !== "") {
                    button.disabled = false;
                } else {
                    button.disabled = true;
                }
            };

            checkInputs();
            loginUsername.addEventListener("keyup", checkInputs);
            loginPass.addEventListener("keyup", checkInputs);

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                form.reset();
                checkInputs();
            });

            resolve();
        });
    }

}

