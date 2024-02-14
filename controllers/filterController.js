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
                this.renderLinks(data.drinks, `strIngredient1`, ingredientsContainer);
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

        data.forEach((item, i) => {
            const button = document.createElement('button');
            button.classList.add('mdc-button', 'mdc-button--raised');
            button.innerHTML = `<span class="mdc-button__ripple"></span> ${item[property]}`;

            button.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedValue = item[property];
                console.log("Selected value", selectedValue);
                const filteredCocktails = this.filterCocktails(selectedValue, property);
                console.log("filter", filteredCocktails);
                this.coctailController.filteredCocktails = filteredCocktails;
                location.hash = "coctails";
            });

            container.appendChild(button);
        });
    }

    // filterCocktails = (selectedValue, property) => {
    //     const cachedData = JSON.parse(localStorage.getItem('coctailDataFavourite')) ;

    //     return cachedData.drinks.filter(cocktail => cocktail[property] === selectedValue);
    // }

    filterCocktails = (selectedValue, property) => {
        const cachedData = JSON.parse(localStorage.getItem('coctailDataFavourite'));
        // Define the maximum number of ingredients to check per cocktail
        const MAX_INGREDIENT_COUNT = 15;

        // Filter cocktails based on whether any of their ingredient fields match the selected value
        return cachedData.drinks.filter(cocktail => {
            // Iterate through each possible ingredient field
            for (let i = 1; i <= MAX_INGREDIENT_COUNT; i++) {
                // Construct the property name dynamically (e.g., strIngredient1, strIngredient2, ...)
                const ingredientProperty = `strIngredient${i}`;
                // Check if the current ingredient matches the selected value
                if (cocktail[ingredientProperty] && cocktail[ingredientProperty].toLowerCase() === selectedValue.toLowerCase()) {
                    return true; // Return true if a match is found
                }
            }
            // Return false if no matching ingredient was found in any of the fields
            return false;
        });
    };



}