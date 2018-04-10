import React, { Component } from 'react';
import { ProductsContainerStyle, ProductsListStyle, ProductsItemStyle, ProductsTitleStyle, Button } from './ProductStyle';

export class Products extends Component {    
    render() {
        const {
            ProductList,
            error,
            isLoaded,
            addProductToCart
        } = this.props;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ProductsContainerStyle>
                    <h2>Products</h2>
                    <ProductsListStyle>
                        {ProductList.map((item, index) => (
                            <ProductsItemStyle key={index}>
                                <ProductsTitleStyle>{item.name}</ProductsTitleStyle>
                                <img src={'https://demo.sylius.com/media/cache/resolve/sylius_shop_product_thumbnail/' + item.images[1].path} alt={item.name} />
                                <p>Price: {item.variants[Object.keys(item.variants)[0]].price.currency} {item.variants[Object.keys(item.variants)[0]].price.current} </p>
                                <Button
                                    type="button"
                                    onClick={addProductToCart}
                                    name={item.slug}
                                >
                                    Add to Cart
                                </Button>
                            </ProductsItemStyle>
                        ))}
                    </ProductsListStyle>
                </ProductsContainerStyle>
            );
        }
    }
}