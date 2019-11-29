import React from 'react'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

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

        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}/>    
            </div>
        )
    }
}

const mapStateTtoProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateTtoProps)(Checkout)