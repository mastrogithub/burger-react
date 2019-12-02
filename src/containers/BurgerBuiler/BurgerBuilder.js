import React from "react";
import { connect } from 'react-redux'
import axios from "../../axios-orders";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/UI/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index'

class BurgerBuilder extends React.Component {
    state = {
        purchasing: false,
        //loading: false,
        //error: false
    };

    componentDidMount() {
        console.log(this.props)
        this.props.initIngredients()
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
        this.props.initPurchase()
        this.props.history.push('/checkout')
    };

    render() {
        console.log(this.props)

        let orderSummary = null;
        let burger = this.props.error ? (<p>Couldn't find ingredients</p>) : (<Spinner />);

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
        ingredients: state.burguerBuilderReducer.ingredients,
        price: state.burguerBuilderReducer.price,
        error: state.burguerBuilderReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: ingredient => dispatch(actions.addIngredient(ingredient)),
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
