import React from 'react'

import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price: {props.price}</p>
        {controls.map(ctrl => 
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                handleAddIngredient={(value) => props.handleAddIngredient({name:ctrl.type, value})} 
                disabled={props.disabled[ctrl.type]}
            />
        )}
        <button 
            className={styles.OrderButton}
            disabled={props.price <= 0}
            onClick={props.order}>ORDER NOW</button>
    </div>
)

export default buildControls