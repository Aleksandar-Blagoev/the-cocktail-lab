function getElement(id) {
    return document.getElementById(id);
}

function createEl(el) {
    return document.createElement(el);
}

function makeAPICallSearch(url, options = {}) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return new Promise((res, rej) => {
                    response.json()
                        .then(result => res(result))
                        .catch(error => res(error))
                })
            }

            return new Promise((res, rej) => {
                response.json()
                    .then(body => {
                        console.log(body);
                        rej(new Error(body.message))
                    })
                    .catch(err => rej(err));
            })
        })
}

function makeAPICall(url, options = {}) {
    return fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            return new Promise((resolve, reject) => {
                response.json().then(body => {
                    reject(new Error(body.message))
                })
            })
        })
}



function debounce(action, seconds) {
    let timerId = null;

    return function (...event) {
        clearTimeout(timerId);
        timerId = setTimeout(action, seconds, ...event)
    }
}


function generateRandomLetter() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
}

getNonNullIngredients = (cocktail) => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        if (ingredient) {
            ingredients.push(ingredient);
        }
    }
    return ingredients.join(', ');
}
