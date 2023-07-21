class DetailManager {

    getCoctailDetail = (coctailId) => {
        
        return makeAPICall(COCTAILS_URL +  `/lookup.php?i=${coctailId}`);
    }
}