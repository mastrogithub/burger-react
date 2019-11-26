import React from 'react'

import classes from './Order.module.css'

const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: </p>
        <p>{JSON.stringify(props.ingredients, null, 2)}</p>
    </div>
)

export default order