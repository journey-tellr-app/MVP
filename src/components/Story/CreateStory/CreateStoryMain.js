import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import CreateStorySteps from './CreateStorySteps.js';
import './CreateStory.css'

import SubHeader from '../../Common/SubHeader';

// ant design import
import { Form, Button, Icon, Row, Col } from 'antd';

class CreateStoryMain extends Component {

    // componentDidMount() {
    //     this.props.form.validateFields();
    // }

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    nextPage = (event) => {
        event.preventDefault();
        this.props.history.push('/choose-template/detail/');
    } // end createStory

    render() {

        const { template } = this.props;

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <Row type='flex' align='middle' justify='center'>
                    <Col span={24}>
                        <SubHeader headerText='Create a Story' />
                    </Col>
                    <Col span={18}>
                        <CreateStorySteps current={0} />
                    </Col>
                    <Col span={18}>
                        <Form layout="vertical" onSubmit={this.nextPage}>
                            <Form.Item
                                label="Create a story or choose a template">
                                <ChooseTemplate />
                            </Form.Item>
                            <Row type="flex" justify="space-between">
                                <Col span={9}>
                                    <Button
                                        className='create-story-nav-btn'>
                                        Cancel
                                    </Button>
                                </Col>

                                <Col span={9}>
                                    <Button
                                        className='create-story-nav-btn'
                                        type="primary"
                                        htmlType="submit"
                                        disabled={template.name === ''}>
                                        Next
                                        <Icon type="right" />
                                    </Button>
                                </Col>

                            </Row>
                        </Form>
                    </Col>

                </Row>




            </div>

        )
    }

}

const mapStoreToProps = reduxStore => ({
    template: reduxStore.template.templateNewStoryReducer,
});

export default connect(mapStoreToProps)(CreateStoryMain);