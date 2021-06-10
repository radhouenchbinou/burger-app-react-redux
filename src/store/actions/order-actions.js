import {
    FETCH_ORDER_FAILS,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_START,
    PURCHASE_BURGER_FAILS,
    PURCHASE_BURGER_START,
    PURCHASE_BURGER_SUCCES,
    PURCHASE_INIT,
    SET_ORDERS, CLEAR_ORDERS
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

export const purchaseBurgerStart = (order, token) => {
    return dispatch => {
        dispatch(setLoadingTrueWhenPurchasing())
        axios.post('/orders.json?auth=' + token, order)
            .then(response => {
                (response.data)
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

export const clearOrders = () => {
    return {
        type: CLEAR_ORDERS,
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

export const startFetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchingOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                (res);
                (res.data)
                dispatch(setOrders(res.data));
                dispatch(fetchOrdersSuccess());

            })
            .catch(err => {
                dispatch(fetchOrdersFails(err))
            });
    }
}
