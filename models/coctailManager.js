class CoctailManager {

    getCoctailOfTheDay = () => {
        return makeAPICallSearch( COCTAILS_URL + `/random.php`);
    }

    getCoctailByTheFirstLetter = () => {
        let randomLetter = generateRandomLetter();
        return makeAPICallSearch(COCTAILS_URL + `/search.php?f=${randomLetter}`)
    }


    searchAll = (keyword) => {
        
        return makeAPICallSearch(COCTAILS_URL + `/search.php?s=${keyword}`)  
    }
}