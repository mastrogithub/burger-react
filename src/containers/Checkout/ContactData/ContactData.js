import React from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../../components/UI/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault()

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Seba",
                street: "Los Pinos 2555"
            },
            email: "test@test.com"
        };
        this.props.orderBurger(order)
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name" />
                <input type="email" name="email" placeholder="Your email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="postal" placeholder="Postal code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burguerBuilderReducer.ingredients,
    price: state.burguerBuilderReducer.price,
    loading: state.orderReducer.loading
})

const mapDispatchToProps = dispatch => ({
    orderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))