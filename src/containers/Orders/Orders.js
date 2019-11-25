import React from 'react'

import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const orders = Object.entries(res.data).map(([key, value]) => {
                    return {key, ...value}
                })
                console.log(orders)
                this.setState({orders, loading: false})
            })
            .catch(err => this.setState({loading: false}))
    }

    render() {
        let orders = this.state.orders.map( order => <Order key={order.key} ingredients={order.ingrdients}/>)
        if(this.state.loading) {
            orders = <Spinner />
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

export default Orders 