import React, { Component } from 'react';
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

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;


class RecoveryForm extends React.Component {
    render(){
        return(


            <Row>
                <Col style={{
                    margin: '20px',
                    float: 'center',
                }}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Button
                        onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}>
                        Recover Password</Button>
                </Col>

            </Row>
        )
    }
}
export default RecoveryForm