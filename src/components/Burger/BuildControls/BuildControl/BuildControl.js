import React from 'react'

import styles from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button 
            className={styles.Less}
            onClick={() => props.handleAddIngredient(-1)}
            disabled={props.disabled}>Less</button>
        <button 
            className={styles.More} 
            onClick={() => props.handleAddIngredient(1)}>More</button>
    </div>
)

export default buildControl