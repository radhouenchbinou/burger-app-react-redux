import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import Aucx from "../../../hoc/Aucx";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {
            props.isAuthenticated ? (
                    <Aucx>
                        <NavigationItem link="/orders">Orders</NavigationItem>
                        <NavigationItem onLogout={props.onLogout} link="/">Logout</NavigationItem>
                    </Aucx>) :
                <NavigationItem link="/auth">Authenticate</NavigationItem>
        }
    </ul>
);

export default navigationItems;
