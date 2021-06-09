import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utils/actions-utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const changeIngerient = (state, action) => {
    const updatedIngredient = action.type === actionTypes.ADD_INGREDIENT ? {[action.ingredientName]: state.ingredients[action.ingredientName] + 1} : {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: action.type === actionTypes.ADD_INGREDIENT ? state.totalPrice + INGREDIENT_PRICES[action.ingredientName] : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state, updatedState);
}

const setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: initialState.totalPrice,
        error: false
    })
}


const burgerBuilderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return changeIngerient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return changeIngerient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILS:
            return updateObject(state, {error: true})
        default:
            return state;
    }
};

export default burgerBuilderReducer;
