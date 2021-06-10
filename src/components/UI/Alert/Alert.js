import React from 'react';

import classes from './Alert.css';

const alert = (props) => (
    <div className={classes[props.type]}>
        {/*<span className={classes.Closebtn}  onClick={props.close}>&times;</span>*/}
        {props.message}
    </div>
    );

export default alert;
