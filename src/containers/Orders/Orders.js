import React from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
//import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

class Orders extends React.Component {
    
    componentDidMount() {
        this.props.fetchOrders(this.props.token)
    }

    render() {
        let orders = this.props.orders.map(order => <Order key={order.key} ingredients={order.ingredients} />)
        if (this.props.loading) {
            orders = <Spinner />
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const maptStateToProps = state => ({
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.authReducer.token
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token) => dispatch(actions.fetchOrders(token))
})

export default connect(
    maptStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios))