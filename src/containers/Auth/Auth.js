import React, {Component} from 'react';
import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import classes from '../../containers/Checkout/ContactData/ContactData.css'
import {checkValidity} from "../../utils/utils";
import {connect} from "react-redux";
import {auth} from "../../store/actions";
import Spinner from '../../components/UI/Spinner/Spinner'
import Alert from '../../components/UI/Alert/Alert'


class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail adddress'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }, password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        inSignUp: true
    }

    switchToSignInHandler = () => {
        this.setState(prevState => {
            return {inSignUp: !prevState.inSignUp}
        })
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.controls.email.value, this.state.controls.password.value, this.state.inSignUp);
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let errormessage = null;
        if (this.props.error) {
            errormessage = (
                <div>
                    <Alert type="Danger" message={this.props.error.message}/>
                </div>
            )
        }
        let form = <Spinner/>
        if (!this.props.loading) {
            form = (<div>
                <form onSubmit={this.onSubmitHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
                    ))}
                    {errormessage}
                    <Button btnType="Success"
                            disabled={!this.state.formIsValid}>{this.state.inSignUp ? 'Sign up' : 'Sign In'}</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchToSignInHandler}>switch
                    to {!this.state.inSignUp ? 'Sign up' : 'Sign In'}</Button>
            </div>)
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        building: state.burgerBuilder.building,
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
