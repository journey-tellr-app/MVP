import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';


class RecoveryForm extends React.Component {
    constructor(){
        super();
        this.state={
            email: ''
        }
    }
    handleChange = (event) => {
        this.setState({
            email: event.target.value,
        });
        console.log(this.state);
        
    }
    submitEmail = () =>{
        this.props.dispatch({ type: 'RECOVER_PASSWORD', payload:this.state.email });
    }
    render(){
        return(
            <Row>
                <Col style={{margin: '20px',float: 'center'}}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email" onChange={this.handleChange}
                        />
                    </Form.Item>
                    <Button
                        onClick={this.submitEmail}>
                        Recover Password</Button>
                </Col>

            </Row>
        )
    }
}
const mapStateToProps = state => ({
    errors: state.errors,
});

export default connect(mapStateToProps)(RecoveryForm);