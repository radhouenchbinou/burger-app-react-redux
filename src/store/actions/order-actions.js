import {
    FETCH_ORDER_FAILS,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_START,
    PURCHASE_BURGER_FAILS,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCES,
    PURCHASE_INIT,
    SET_ORDERS
} from "./actionTypes";
import axios from "../../axios-orders";

export * from './actionTypes'


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCES,
        orderId: id,
        orderData: orderData
    };
};


export const purchaseBurgerFails = (error) => {
    return {
        type: PURCHASE_BURGER_FAILS,
        error: error
    }
}

export const setLoadingTrueWhenPurchasing = () => {
    return {
        type: PURCHASE_BURGER_START,
    }
}

export const purchaseBurgerStart = (order) => {
    return dispatch => {
        dispatch(setLoadingTrueWhenPurchasing())
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name, order))
            })
            .catch(error => {
                dispatch(purchaseBurgerFails(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    }
}

export const setOrders = (orders) => {
    return {
        type: SET_ORDERS,
        orders: orders
    }
}

export const fetchOrdersSuccess = () => {
    return {
        type: FETCH_ORDER_SUCCESS
    };
}

export const fetchOrdersFails = (err) => {
    return {
        type: FETCH_ORDER_FAILS,
        error: err.message
    };
}

export const fetchingOrdersStart = () => {
    return {
        type: FETCH_ORDER_START,
    }
}

export const startFetchOrders = () => {
    return dispatch => {

        dispatch(fetchingOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                console.log(res);
                console.log(res.data)
                dispatch(setOrders(res.data));
                dispatch(fetchOrdersSuccess());

            })
            .catch(err => {
                dispatch(fetchOrdersFails(err))
            });
    }
}
