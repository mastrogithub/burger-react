import React from 'react';

import Aux from '../Auxiliary/Auxiliary'
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    state = {
        showSideDrawer: true
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true})
    }
 
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerOpenedHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;