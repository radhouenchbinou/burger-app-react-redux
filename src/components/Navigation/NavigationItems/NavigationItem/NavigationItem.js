import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = ( props ) => (
    <li className={classes.NavigationItem} onClick={props.onLogout?props.onLogout:null}>
        <NavLink 
            to={props.link}
            exact={props.exact}
            activeClassName={props.onLogout?null:classes.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;
