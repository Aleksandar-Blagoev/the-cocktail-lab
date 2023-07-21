class DetailController {

    constructor(userManager) {
        this.userManager = userManager;
    }

    render = (cocktail) => {
        location.hash = "details";
        const detailsContainer = document.querySelector('#detailsContainerCard');
        detailsContainer.innerHTML = '';

        let card = document.createElement('div');
        card.classList.add('mdc-card', 'demo-card', 'details-card'); // Add MDC card classes
        card.innerHTML = `
            <img src="${cocktail.drinks[0].strDrinkThumb}" class="card-img-top" alt="...">
            <div class="mdc-card__primary">
                <h2 class="demo-card__title mdc-typography mdc-typography--headline6">${cocktail.drinks[0].strDrink}</h2>
                <p class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">Category: ${cocktail.drinks[0].strCategory}</p>
            </div>
            <div class="mdc-card__secondary mdc-typography mdc-typography--body2">
                <p>Glass: ${cocktail.drinks[0].strGlass}</p>
                <p>Instructions: ${cocktail.drinks[0].strInstructions}</p>
                <p>Ingredients: ${getNonNullIngredients(cocktail.drinks[0])}</p>
                <!-- Add any other details you want to display here -->
            </div>
        `;

        detailsContainer.appendChild(card);

    }
}
