import React from "react";

import Aux from "../../hoc/Aux/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        purchasing: false,
        loading: false
    };

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
        //alert('You continue!')
        this.setState({ loading: true });

        const order = {
            ingrdients: this.state.ingredients,
            price: Math.floor(Math.random() * 50),
            customer: {
                name: "Seba",
                street: "Los Pinos 2555"
            },
            email: "test@test.com"
        };
        setTimeout(
            () =>
                axios
                    .post("/orders.json", order)
                    .then(res => this.setState({ loading: false, purchasing: false }))
                    .catch(err => this.setState({ loading: false, purchasing: false})),
            3000
        );
    };

    componentDidUpdate() {
        console.log("it ddid");
    }

    render() {
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

        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        );
        if (this.state.loading) {
            orderSummary = <Spinner />
        }
            return (
                <Aux>
                    <Modal
                        show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}
                    >
                        {orderSummary}
                    </Modal>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        price={price}
                        handleAddIngredient={this.addIngredientHandler}
                        disabled={disabledInfo}
                        order={this.orderHandler}
                    />
                </Aux>
            );
    }
}

export default BurgerBuilder;
