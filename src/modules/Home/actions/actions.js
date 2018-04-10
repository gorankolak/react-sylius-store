const BASE_URL = 'https://demo.sylius.com/shop-api/taxon-products-by-slug/books';

const FetchProducts = (productsState, errorState) => {
    fetch(`${BASE_URL}?channel=US_WEB&page=1&limit=6`)
    .then(res => res.json())
    .then(
        result => productsState(result),
        error => errorState(error)
    );
}

export { FetchProducts };