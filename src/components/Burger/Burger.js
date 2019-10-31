import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import styles from './Burger.module.css'

const times = (fn, n) => {
    let ret = [];
    while(n > 0) {
        ret = ret.concat(fn(n));
        n--;
    }
    return ret;
}

const burger = (props) => {
    let listIngredients = Object.entries(props.ingredients).reduce((acc, pair) => {
        const [key, value] = pair
        return acc.concat(
            times((i) => <BurgerIngredient type={key} key={key + i} />, value)
        )
    }, [])

    if(!listIngredients.length) {
        listIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {listIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger