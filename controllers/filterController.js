class FilterController {
    constructor(filterManager, coctailController, data) {
        this.filterManager = filterManager;
        this.coctailController = coctailController;
        // this.cachedData = JSON.parse(localStorage.getItem('coctailDataFavourite')) || data;
    }

    render = () => {
        let categoryContainer = document.querySelector("#categoryList");
        let cupTypeContainer = document.querySelector("#cupTypeList");
        let ingredientsContainer = document.querySelector("#ingredientsList");
        let typeDrinkContainer = document.querySelector("#typeDrinkList");

        categoryContainer.innerHTML = "";
        cupTypeContainer.innerHTML = "";
        ingredientsContainer.innerHTML = "";
        typeDrinkContainer.innerHTML = "";

        this.filterManager.filterByCategory()
            .then(data => {
                this.renderLinks(data.drinks, "strCategory", categoryContainer);
            })
            .then(() => {
                return this.filterManager.filterByGlass();
            })
            .then(data => {
                this.renderLinks(data.drinks, "strGlass", cupTypeContainer);
            })
            .then(() => {
                return this.filterManager.filterByIngridients();
            })
            .then(data => {
                this.renderLinks(data.drinks, "strIngredient1", ingredientsContainer);
            })
            .then(() => {
                return this.filterManager.filterByAlcohol();
            })
            .then(data => {
                this.renderLinks(data.drinks, "strAlcoholic", typeDrinkContainer);
            })
            .catch(err => console.error(err));

    }


    renderLinks = (data, property, container) => {
        // let mainContainer = document.querySelector("#favouriteContainer");

        data.forEach((item,i) => {
            const button = document.createElement('button');
            button.classList.add('mdc-button', 'mdc-button--raised');
            button.innerHTML = `<span class="mdc-button__ripple"></span> ${item[property]}`;

            button.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedValue = item[property];
                const filteredCocktails =  this.filterCocktails(selectedValue, property);
                this.coctailController.filteredCocktails = filteredCocktails; 
                location.hash = "coctails";
            });

            container.appendChild(button);
        });
    }

    filterCocktails = (selectedValue, property) => {
        const cachedData = JSON.parse(localStorage.getItem('coctailDataFavourite')) ;

        return cachedData.drinks.filter(cocktail => cocktail[property] === selectedValue);
    }

}