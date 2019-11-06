import React from 'react'

import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.entries(props.ingredients).map(pair => {
        const [key, value] = pair
        const item = `${key}: ${value}`
        return (
            <li style={{textTransform: "capitalize"}} key={key}>
                {item}
            </li>
        )
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary