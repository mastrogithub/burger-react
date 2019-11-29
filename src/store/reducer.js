import * as actionsTypes from './actions'

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    price: 0
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
            const price = state.price + INGREDIENTS_PRICES[name]*value
            return {
                ...state,
                ingredients,
                price
            }
        default:
            return state
    }
}
