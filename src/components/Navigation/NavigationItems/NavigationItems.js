import React from 'react'

import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {props.isAuth
            ? (
                <React.Fragment>
                    <NavigationItem link="/orders">Orders</NavigationItem>
                    <NavigationItem link="/logout">Logout</NavigationItem>
                </React.Fragment>
            )
            : <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
)

export default navigationItems