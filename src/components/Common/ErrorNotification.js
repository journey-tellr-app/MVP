import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { notification } from 'antd';

class ErrorNotification extends Component {
    static propTypes = {
        nKey: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        dispatchType: PropTypes.string.isRequired,
    }

    showErrorMessage = () => {
        const { nKey, message, description } = this.props
        notification.open({
            key: nKey,
            message: message,
            description: description,
            duration: 4,
        });
        
    }

    render() {

        return (
            <div>
                {this.props &&
                    this.showErrorMessage()
                }
            </div>
        )
    }
}

export default connect()(ErrorNotification);
