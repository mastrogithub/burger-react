import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    id,
    orderData
})

export const purchaseBurgerFail = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
})

export const purchaseBurgerStart = orderData => dispatch => {
    axios
        .post("/orders.json", orderData)
        .then(res => {
            dispatch(purchaseBurgerStart(res.data, orderData))
        })
        .catch(error =>
            dispatch(purchaseBurgerFail(error))
        )
}