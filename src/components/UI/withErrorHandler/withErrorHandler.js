import React from 'react'

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Modal from '../Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error })
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Auxiliary>
                        <Modal 
                            show={this.state.error}
                            modalClosed={this.errorConfirmedHandler}>
                            {this.state.error? this.state.error.message : null}
                        </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}

export default withErrorHandler