import * as actionTypes from '../actions/actionTypes'
import {updateObject} from "../utils/actions-utility";

const initialState = {
    orders: [],
    purchasing: false,
    error: null,
    purchased: false,
    fetchingOrders: false,
    fetchOrderError: null,
}

const purchaseSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId,
    }
    return updateObject(state, {
        purchasing: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const purchaseFails = (state, action) => {
    return updateObject(state, {
        purchasing: false,
        error: action.error
    })
}

const setOrders = (state, action) => {
    const fetchedOrders = [];
    console.log(action.orders);
    for (let key in action.orders) {
        fetchedOrders.push({
            ...action.orders[key],
            id: key
        });
    }
    return updateObject(state, {
        orders: fetchedOrders,
    });
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCES:
            return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILS:
            return purchaseFails(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, {purchasing: true})
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, {purchased: false,})
        case actionTypes.SET_ORDERS:
            return setOrders(state, action);
        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state, {
                fetchingOrders: false,
                fetchOrderError: null
            });
        case actionTypes.FETCH_ORDER_FAILS:
            return updateObject(state, {
                fetchingOrders: false,
                fetchOrderError: action.error
            });
        case actionTypes.FETCH_ORDER_START:
            return updateObject(state, {fetchingOrders: true,})
        default:
            return state;
    }
}

export default orderReducer;
