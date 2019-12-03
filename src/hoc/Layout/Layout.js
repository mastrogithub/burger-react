import React from 'react';
import { connect } from 'react-redux'
import Auxiliary from '../Auxiliary/Auxiliary'
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    state = {
        showSideDrawer: true
    }
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerOpenedHandler = () => {
        this.setState({ showSideDrawer: true })
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    isAuth={this.props.isAthenticated}
                    drawerToggleClicked={this.sideDrawerOpenedHandler} />
                <SideDrawer
                    isAuth={this.props.isAthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => ({
    isAthenticated: state.authReducer.token !== null
})

export default connect(mapStateToProps)(Layout);