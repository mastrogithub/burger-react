import React from 'react'

import classes from './Auth.module.css'

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
        isFormValid: false
    }

    submitHandler = (event) => {
        event.preventDefault()
        console.log('event', event)
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
        const isFormValid = this.state[name] && isValid
        this.setState(state => ({
            ...state,
            [name]: { ...state[name], isValid }
        }), () => this.setState({ isFormValid: this.state.email.isValid && this.state.password.isValid }))
    }

    render() {
        return (
            <div className={classes.Contenedor}>
                <form onSubmit={this.submitHandler}>
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        onChange={this.changeHandler}
                        placeholder="Enter Email..."
                        required />
                    <label>Password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={this.changeHandler}
                        placeholder="Enter Password..."
                        required />
                    <button type="submit" disabled={!this.state.isFormValid}>Enviar</button>
                </form>
            </div>
        )
    }
}

export default Auth