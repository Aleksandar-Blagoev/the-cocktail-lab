class CoctailController {

    constructor(userManager, coctailManager, detailManager, detailController) {
        this.userManager = userManager;
        this.coctailManager = coctailManager;
        this.detailManager = detailManager;
        this.detailController = detailController;
        this.cachedData = JSON.parse(localStorage.getItem('coctailData')) || null;
        this.cachedDataFavourite = JSON.parse(localStorage.getItem('coctailDataFavourite')) || null;
        this.filteredCocktails = null; // Variable to store filtered cocktail data

    }

    render = (event) => {

        let search = document.querySelector("#search");
        let container = document.querySelector("#mainContainer");
        let favoriteContainer = document.querySelector("#favouriteContainer");

        container.innerHTML = '';
        favoriteContainer.innerHTML = '';

        search.oninput = debounce((event) => {
            favoriteContainer.innerHTML = '';
            let keyword = event.target.value;

            if (keyword === '') {
                this.coctailManager.searchAll(keyword)
                    .then(result => {
                        this.renderCoctails(result, favoriteContainer)
                    })
                    .catch(err => alert(err))
            } else {
                this.coctailManager.searchAll(keyword)
                    .then(result => {
                        console.log(result)
                        this.renderCoctails(result, favoriteContainer)
                    })
                    .catch(err => alert(err))
            }

        }, 500)

        if (this.filteredCocktails) {
            this.renderCoctails(this.filteredCocktails, favoriteContainer);
        } else {
            if (this.cachedData && this.cachedDataFavourite) {
                this.renderCoctails(this.cachedData, container);
                this.renderCoctails(this.cachedDataFavourite, favoriteContainer);
            } else {
                // Make the API call and cache the data if it's not already cached
                this.coctailManager
                    .getCoctailOfTheDay()
                    .then((data) => {
                        this.cachedData = data; // Cache the data
                        localStorage.setItem('coctailData', JSON.stringify(data)); // Store in Local Storage
                        this.renderCoctails(data, container);
                    })
                    .then(() => {
                        return this.coctailManager.getCoctailByTheFirstLetter();
                    })
                    .then((data) => {
                        this.cachedDataFavourite = data; // Cache the data
                        localStorage.setItem('coctailDataFavourite', JSON.stringify(data)); // Store in Local Storage
                        this.renderCoctails(data, favoriteContainer);
                    })
                    .catch((err) => console.error(err));
            }
        }
    }


    renderCoctails = (list, container) => {
        container.innerHTML = '';

        const drinks = Array.isArray(list) ? list : (list && list.drinks) ? list.drinks : [];

        drinks.forEach(element => {
            let card = document.createElement("div");
            card.classList.add('mdc-card', 'demo-card'); // Add MDC card classes

            // MDC card primary action
            let cardPrimaryAction = document.createElement("div");
            cardPrimaryAction.classList.add('mdc-card__primary-action', 'demo-card__primary-action');
            cardPrimaryAction.setAttribute('tabindex', '0');

            // MDC card media
            let cardMedia = document.createElement("div");
            cardMedia.classList.add('mdc-card__media', 'mdc-card__media--16-9', 'demo-card__media');
            cardMedia.style.backgroundImage = `url("${element.strDrinkThumb}")`;

            // MDC card primary content
            let cardPrimaryContent = document.createElement("div");
            cardPrimaryContent.classList.add('demo-card__primary');

            // MDC card title
            let cardTitle = document.createElement("h2");
            cardTitle.classList.add('demo-card__title', 'mdc-typography', 'mdc-typography--headline6');
            cardTitle.innerText = element.strDrink;
            cardTitle.style.padding = "10px";

            // MDC card secondary content (ingredients)
            let cardSecondaryContent = document.createElement("div");
            cardSecondaryContent.classList.add('demo-card__secondary', 'mdc-typography', 'mdc-typography--body2');
            cardSecondaryContent.innerText = getNonNullIngredients(element);
            cardSecondaryContent.style.padding = "10px";

            // "Details" button
            let detailsBtn = document.createElement("button");
            detailsBtn.classList.add('mdc-button', 'mdc-card__action', 'mdc-card__action--button');
            detailsBtn.innerHTML = '<span class="mdc-button__ripple"></span>Details';

            // Add onclick event for the "Details" button
            detailsBtn.onclick = (event) => {
                this.detailManager.getCoctailDetail(element.idDrink)
                    .then(res => {
                        console.log(res);
                        this.detailController.render(res);
                    })
            };

            cardPrimaryContent.appendChild(cardTitle);
            cardPrimaryAction.appendChild(cardMedia);
            cardPrimaryAction.appendChild(cardPrimaryContent);
            cardPrimaryAction.appendChild(cardSecondaryContent);
            cardPrimaryAction.appendChild(detailsBtn); // Add the "Details" button to the card
            card.appendChild(cardPrimaryAction);

            container.appendChild(card);
        });
    }
}
