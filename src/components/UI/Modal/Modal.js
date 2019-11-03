import React from 'react'

import styles from './Modal.module.css'
import Aux from '../../../hoc/Aux/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component {

    componentShoudUpdate(prevProps, prevState) {
        return prevProps.show !== this.props.show
    }

    render () {
        return (
            <Aux>
        <Backdrop 
            show={this.props.show}
            clicked={    this.props.modalClosed}
        />
        <div
            className={styles.Modal}
            style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
        </div>
    </Aux>
        )
    }
}

export default Modal