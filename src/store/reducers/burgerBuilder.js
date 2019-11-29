import * as actionsTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    price: 0,
    error: false
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            const { name, value } = action.payload
            const ingredients = {
                ...state.ingredients,
                [name]: state.ingredients[name] + value
            }
            const price = state.price + INGREDIENTS_PRICES[name] * value
            return {
                ...state,
                ingredients,
                price
            }
        case actionsTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
                error: false
            }
        case actionsTypes.FETCH_INGREDIENTS_FAILD:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}
