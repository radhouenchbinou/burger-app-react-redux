import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import {startFetchOrders} from "../../store/actions";
import {connect} from "react-redux";

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders()
    }

    render() {
        let orders = <Spinner/>
        if(this.props.orders.length === 0) {
            orders = <p>ORDER list is empty</p>
        }
        if (!this.props.loading && this.props.orders.length !== 0) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(startFetchOrders()),
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.fetchingOrders
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
