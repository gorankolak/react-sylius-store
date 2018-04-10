import React, { Component } from 'react';
import { Main } from './HomeStyle';
import { Products, Cart } from './components';
import { FetchProducts } from './actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            totalCartPrice: 0
        };
    }

    componentDidMount() {
        FetchProducts(this.productsState, this.errorState);
    }

    productsState = (result) => {
        this.setState({
            isLoaded: true,
            ProductList: result.items
        });
    }

    errorState = (error) => {
        this.setState({
            isLoaded: true,
            error: this.error
        });
    }

    getTotalPrice = () => {
        let totalCartPrice = 0;

        this.state.cart.forEach(cartItem => {
            const cartPrice = cartItem.variants[Object.keys(cartItem.variants)[0]].price.current;
            totalCartPrice += cartPrice * cartItem.quantity;
        });
        return totalCartPrice;
    };

    addProductToCart = e => {
        const id = e.target.name;
        const item = this.state.ProductList.find(item => item.slug === id);
        const cart = this.state.cart.filter(n => n.slug !== id);
        
        if (!item.quantity) {
            item.quantity = 0;
        }
        item.quantity += 1;
        cart.push(item);
        this.setState({
            cart
        });
    };

    removeProductFromCart = e => {
        const id = e.target.name;
        const item = this.state.ProductList.find(item => item.slug === id);
        const cart = this.state.cart;
        const newCart = cart.filter(n => n.slug !== id);
        item.quantity = 0;
        this.setState({
            cart: newCart
        });
    };

    render() {
        const ProductList = this.state.ProductList;
        const error = this.state.error;
        const isLoaded = this.state.isLoaded;
        const cart = this.state.cart;
        const totalPrice = this.getTotalPrice();
        const removeProductFromCart = this.removeProductFromCart;
        const addProductToCart = this.addProductToCart;

        return (
            <Main>
                <Products
                    addProductToCart={addProductToCart} 
                    ProductList={ProductList}
                    error={error}
                    isLoaded={isLoaded}
                />
                <Cart
                    cart={cart}
                    totalPrice={totalPrice}
                    removeProductFromCart={removeProductFromCart}
                />
            </Main>
        );
    }
}

export default Home;