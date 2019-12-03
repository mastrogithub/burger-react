import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: { id, orderData }
})

export const purchaseBurgerFail = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
})

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => dispatch => {
    dispatch(purchaseBurgerStart())
    axios
        .post("/orders.json?auth=" + token, orderData)
        .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        })
        .catch(error =>
            dispatch(purchaseBurgerFail(error))
        )
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => dispatch => {
    dispatch(fetchOrdersStart())
    axios
        .get('/orders.json?auth=' + token)
        .then(res => {
            const orders = Object.entries(res.data).map(([key, value]) => {
                return { key, ...value }
            })
            dispatch(fetchOrdersSuccess(orders))
        })
        .catch(err => dispatch(fetchOrdersFail(err)))
}