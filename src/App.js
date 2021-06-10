import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {connect} from "react-redux";
import {authCheckState} from "./store/actions/auth-actions";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";


const asyncCheckout = asyncComponent(() => {
    return import( './containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth')
})

class App extends Component {
    componentDidMount() {
        this.props.checkLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>

        )

        if (this.props.isAuthenticated) {
            routes = (<Switch>
                <Route path="/checkout" component={asyncCheckout}/>
                <Route path="/orders" component={asyncOrders}/>
                <Route path="/" exact component={BurgerBuilder}/>
                <Redirect to="/"/>
            </Switch>)
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkLogin: () => dispatch(authCheckState())
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
