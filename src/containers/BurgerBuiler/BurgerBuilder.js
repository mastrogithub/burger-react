import React from "react";

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/UI/withErrorHandler/withErrorHandler";

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        console.log(this.props)
        axios
            .get("https://udemy-burger-9f60b.firebaseio.com/ingredients.json")
            .then(res => this.setState({ ingredients: res.data }))
            .catch(error => this.setState({ error: true }));
    }

    addIngredientHandler = ingredient => {
        this.setState(prevState => {
            const { name, value } = ingredient;
            if (this.state.ingredients[name] + value < 0) return;

            return {
                ingredients: {
                    ...prevState.ingredients,
                    [name]: prevState.ingredients[name] + value
                }
            };
        });
    };

    orderHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // //alert('You continue!')
        
        const queryParams = []
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        })
    };

    componentDidUpdate() {
        console.log("it ddid");
    }

    render() {
        let orderSummary = null;
        let burger = this.state.error ? (
            <p>Couldn't find ingredients</p>
        ) : (
            <Spinner />
        );

        if (this.state.ingredients) {
            const { disabledInfo, price } = Object.entries(
                this.state.ingredients
            ).reduce(
                (acc, pair) => {
                    const [key, value] = pair;
                    acc.disabledInfo[key] = value <= 0; //determian si debe estar deshabilitado
                    acc.price += INGREDIENTS_PRICES[key] * value; //calcula el precio
                    return acc;
                },
                { disabledInfo: {}, price: 0 }
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
            if (this.state.loading) {
                orderSummary = <Spinner />;
            }

            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        price={price}
                        handleAddIngredient={this.addIngredientHandler}
                        disabled={disabledInfo}
                        order={this.orderHandler}
                    />
                </Auxiliary>
            );
        }

        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default  withErrorHandler(BurgerBuilder, axios);
