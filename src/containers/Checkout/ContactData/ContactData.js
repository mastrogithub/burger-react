import React from 'react'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends React.Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({ loading: true });

        const order = {
            ingrdients: this.props.ingredients,
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
                    .then(res => {
                        this.setState({ loading: false })
                        this.props.history.push('/')
                    }

                    )
                    .catch(err =>
                        this.setState({ loading: false })
                    ),
            3000
        );
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
        if (this.state.loading) {
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

export default ContactData