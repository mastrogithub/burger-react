import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Auth extends React.Component {
    state = {
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        isFormValid: false,
        isSignup: true
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.auth(this.state.email.value, this.state.password.value, this.state.isSignup)
    }

    changeHandler = (event) => {
        const { name, value } = event.target
        this.setState(state => {
            return {
                ...state,
                [name]: { ...state[name], value }
            }
        }, () => this.validateField(name, value))
    }

    validateField = (name, value) => {
        let isValid = this.state[name].isValid

        switch (name) {
            case 'email':
                isValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value)
                break;
            case 'password':
                isValid = value.trim().length >= 7
                break;
            default: return
        }
        this.setState(
            state => ({
                ...state,
                [name]: { ...state[name], isValid }
            }),
            () => this.setState({ isFormValid: this.state.email.isValid && this.state.password.isValid })
        )
    }

    swithAuthModeHandler = () => {
        this.setState(state => ({ isSignup: !state.isSignup }))
    }

    render() {
        const form = this.props.loading ? <Spinner /> : (
            <React.Fragment>
                <form className={classes.Form} onSubmit={this.submitHandler}>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        onChange={this.changeHandler}
                        placeholder="Enter Email..."
                        className={classes.Input}
                        required />
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={this.changeHandler}
                        placeholder="Enter Password..."
                        className={classes.Input}
                        required />
                    <button
                        type="submit"
                        className={[classes.SuccessButton, classes.Button].join(' ')}
                        disabled={!this.state.isFormValid}>Enviar</button>
                </form>
                <button
                    type="button"
                    className={[classes.DangerButton, classes.Button].join(' ')}
                    onClick={this.swithAuthModeHandler} >SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</button>
            </React.Fragment>
        )

        return (
            <div className={classes.Contenedor}>
                {this.props.isAuthenticated ? <Redirect to="/"/> : null}
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token !== null
})

const mapDispatchToProps = dispatch => ({
    auth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)