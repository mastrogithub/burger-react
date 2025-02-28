import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavigationItem.module.css'
import classes from './NavigationItem.module.css'


const navigationItem = props => (
    <li className={styles.NavigationItem}>
        <NavLink
            to={props.link}
            exact
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
)

export default navigationItem