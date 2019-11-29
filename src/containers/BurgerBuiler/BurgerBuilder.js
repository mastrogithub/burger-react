import React from "react";
import { connect } from 'react-redux'

import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/UI/withErrorHandler/withErrorHandler";
import * as actionsTypes from '../../store/actions'

class BurgerBuilder extends React.Component {
    state = {
        loading: false,
        error: false
    };

    componentDidMount() {
        console.log(this.props)
        // axios
        //     .get("https://udemy-burger-9f60b.firebaseio.com/ingredients.json")
        //     .then(res => this.setState({ ingredients: res.data }))
        //     .catch(error => this.setState({ error: true }));
    }

    orderHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // const queryParams = []
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
        // }
        this.props.history.push('/checkout')
    };

    render() {
        let orderSummary = null;
        let burger = this.state.error ? (<p>Couldn't find ingredients</p>) : (<Spinner />);

        if (this.props.ingredients) {
            const disabledInfo = Object.entries(this.props.ingredients).reduce((acc, [key, value]) => {
                acc[key] = value <= 0; //determian si debe estar deshabilitado
                return acc;
            }, {});

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
            if (this.state.loading) {
                orderSummary = <Spinner />;
            }

            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        price={this.props.price}
                        handleAddIngredient={this.props.addIngredientHandler}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingredient => {
            dispatch({ type: actionsTypes.ADD_INGREDIENT, payload: ingredient })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
