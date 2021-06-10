import * as actionTypes from './actionTypes'
import axios from "../../axios-orders";


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFails = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILS,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burgerapp-a783c-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                (response.data)
                dispatch(setIngredients(response.data))
            })
            .catch(reason => {
                dispatch(fetchIngredientsFails());
            })
    };
}
