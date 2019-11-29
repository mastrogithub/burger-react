import * as actionsTypes from './actionTypes'
import axios from "../../axios-orders";

export const addIngredient = (ingredient) => ({
    type: actionsTypes.ADD_INGREDIENT,
    payload: ingredient
})

export const setIngredients = (ingredients) => ({
    type: actionsTypes.SET_INGREDIENTS,
    payload: ingredients
})

export const fetchIngredientsFaild = () => ({
    type: actionsTypes.FETCH_INGREDIENTS_FAILD
})

export const initIngredients = () => dispatch => {
    axios
        .get("https://udemy-burger-9f60b.firebaseio.com/ingredients.json")
        //.then(res => {console.log('response',res.data); return res})
        .then(res => dispatch(setIngredients(res.data)))
        .catch(error => dispatch(fetchIngredientsFaild()));
}