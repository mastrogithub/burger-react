import React from 'react'
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
//import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index'

class Orders extends React.Component {
    
    componentDidMount() {
        this.props.fetchOrders()
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
    loading: state.orderReducer.loading
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(actions.fetchOrders())
})

export default connect(
    maptStateToProps,
    mapDispatchToProps
)(Orders)