class ViewController {
    constructor() {
        window.addEventListener('load', this.handleHashChange);
        window.addEventListener('hashchange', this.handleHashChange);

        this.userManager = new UserManager();
        this.coctailManager = new CoctailManager();
        this.detailManager = new DetailManager();
        this.filterManager = new FilterManager();

        this.loginController = new LoginController(this.userManager);
        this.registerController = new RegisterController(this.userManager);
        this.detailController = new DetailController(this.userManager);
        this.coctailController = new CoctailController(this.userManager, this.coctailManager, this.detailManager, this.detailController);
        this.filterController = new FilterController(this.filterManager, this.coctailController);

        this.renderHeader();
    }

    handleHashChange = (e) => {
        const hash = location.hash.slice(1) || PAGE_IDS[0];

        if (!PAGE_IDS.includes(hash)) {
            location.hash = '404';
            return
        }

        if (hash === 'coctails' || hash === 'details' || hash === 'filter') {
            if (!this.userManager.loggedUser) {
                location.hash = 'login';
                return;
            }
        }

        PAGE_IDS.forEach(pageId => {
            let tab = document.querySelector(`a[href="#${pageId}"]`);
            let element = document.getElementById(pageId);

            if (tab) {
                if (hash === pageId) {
                    tab.classList.add('mdc-tab--active');
                } else {
                    tab.classList.remove('mdc-tab--active');
                }
            }

            if (element) {
                if (hash === pageId) {
                    element.style.display = "block";
                } else {
                    element.style.display = "none";
                }
            }
        });


        switch (hash) {
            case 'register':
                this.registerController.render();
                break;
            case 'login':
                this.loginController.render();
                break;
            case 'coctails':
                if (this.coctailController.filteredCocktails) {
                    this.coctailController.render();
                } else {
                    this.coctailController.filteredCocktails = null; // Reset filteredCocktails
                    this.coctailController.render();
                }
                break;
            case 'filter':
                this.coctailController.filteredCocktails = null; // Reset filteredCocktails
                this.filterController.render();
                break;
            case 'details':
                this.coctailController.filteredCocktails = null; // Reset filteredCocktails
                break;
        }

        this.renderHeader();
    }


    renderHeader = () => {
        let loginButton = document.querySelector("#login-link");
        let registerButton = document.querySelector("#register-link");
        let logoutButton = document.querySelector("#logout-link");

        if (this.userManager.loggedUser) {
            loginButton.style.display = "none";
            registerButton.style.display = "none";
            logoutButton.style.display = "block";
            logoutButton.onclick = () => {
                this.userManager.logout();
                this.renderHeader();
            };
        } else {
            loginButton.style.display = "block";
            registerButton.style.display = "block";
            logoutButton.style.display = "none";
        }
    };


}

let viewController = new ViewController();