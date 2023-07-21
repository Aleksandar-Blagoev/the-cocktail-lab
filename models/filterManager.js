class FilterManager {

    filterByCategory = () => {
        return makeAPICall(COCTAILS_URL +  `/list.php?c=list`);
    }

    filterByGlass = () => {
        return makeAPICall(COCTAILS_URL +  `/list.php?g=list`);
    }

    filterByIngridients = () => {
        return makeAPICall(COCTAILS_URL +  `/list.php?i=list`);
    }

    filterByAlcohol = () => {
        return makeAPICall(COCTAILS_URL +  `/list.php?a=list`);
    }

}