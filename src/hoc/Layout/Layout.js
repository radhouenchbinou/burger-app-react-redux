import React, { Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aucx from "../Aucx";
import {connect} from "react-redux";
import {logout} from "../../store/actions/auth-actions";
import {clearOrders} from "../../store/actions/order-actions";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    logoutHandler = () => {
        this.props.logout();
        this.props.clearOrders();
    }

    render () {
        return (
            <Aucx>
                <Toolbar onLogout={this.logoutHandler} isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    onLogout={this.logoutHandler} isAuthenticated={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aucx>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        clearOrders: () => dispatch(clearOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);
