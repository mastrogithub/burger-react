import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import * as actions from '../../store/actions/index'

class Checkout extends React.Component {

    componenDidUpdate() {
        console.log('this.props.match', this.props.match)
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data')
    }

    render() {
        const purchased = this.props.purchased ? <Redirect to="/" /> : null
        const summary = !this.props.ingredients ?
            <Redirect to="/" /> :
            (
                <div>
                    {purchased}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            )


        return summary
    }
}

const mapStateTtoProps = state => {
    return {
        ingredients: state.burguerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
}

export default connect(mapStateTtoProps)(Checkout)