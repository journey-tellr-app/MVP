import React, {Component} from 'react';
// import { connect } from 'react-redux';
import RecoveryForm from './RecoveryForm';

// import { Input, Icon, Row, Col, Button, notification } from 'antd';
// import { Form, Icon, Input, Button } from 'antd';
class EmailRecovery extends Component {
    constructor (){
        super();
        this.state = {
            email: ''
        }
    } //end constructor

    render (){
        // const { email } = this.state;
        return(
            <div>
                <h1>Hi</h1>
                <RecoveryForm />
            </div>
        )

    }
}

export default EmailRecovery