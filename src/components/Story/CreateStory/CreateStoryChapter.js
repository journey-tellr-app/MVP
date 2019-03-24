import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateStorySteps from './CreateStorySteps.js'
import SubHeader from '../../Common/SubHeader';

// ant design import
import { Form, Input, Button, Icon, Row, Col } from 'antd';

let id = 0;

class CreateStoryChapter extends Component {
    removeChapter = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    } // end removeChapter

    addChapter = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    } // end addChapter

    // go back to the previous page
    previousButton = () => {
        this.props.history.push('/choose-template/detail/');
    } // end previousButton

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    nextPage = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((error, values) => {
            if (!error) {
                // check keys value to find out if there are any chapters
                if (values.keys.length > 0) {
                    // filter out empty chapters that have been removes
                    let filterValues = values.title.filter((item) => ({ title: item }));
                    // package the chapters in an object for the reducer
                    let newPayload = filterValues.map((ch) => ({
                        title: ch,
                        text: '',
                        chapter_photo: '/images/placeholder.png',
                    }));
                    // create a variable for dispatching to redux saga and send
                    let dataToSend = { type: 'SET_NEW_STORY_CHAPTER', payload: newPayload };
                    this.props.dispatch(dataToSend);
                }
                // go to the contributor page
                this.props.history.push('/choose-template/contributor/');
            } else {
                console.log('Error: ', values);
            }
        });
    } // end createChapter

    render() {

        const { template } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        // create initial values for the 'keys' to show template chapters
        const tempArray = template.length > 0 ? template.map((item, i) => (i)) : [];
        // const chapArray = chapter.length > 0 ? chapter.map((item,i) => (i)) : [];
        // const useArray = chapter.length !== 0 ? chapArray : tempArray;

        // used in the formItems map to display a user prompt if a template
        const isTemplate = template.length > 0 ? true : false;

        getFieldDecorator('keys', { initialValue: tempArray });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Col span={24} key={index}>
                <Form.Item
                    label={`Chapter ${index + 1}`}
                    extra={isTemplate && (k >= 0 && k <= (template.length - 1)) ? template[k].text : ''}
                    required={true}
                >
                    {getFieldDecorator(`title[${k}]`, {
                        initialValue: isTemplate && (k >= 0 && k <= (template.length - 1)) ? template[k].title : '',
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "Please enter a chapter title or delete.",
                        }],
                    })(
                        <Input style={{ width: '100%' }}
                            addonAfter={<Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.removeChapter(k)}
                            />} />
                    )}

                </Form.Item>
            </Col>
        ));

        return (
            <div>
                <Row type='flex' align='middle' justify='center'>
                    <Col span={24}>
                        <SubHeader headerText='Add Chapters' />
                    </Col>
                    <Col span={18}>
                        <CreateStorySteps current={2} />
                    </Col>
                    <Col span={18}>
                        <Form layout="vertical" onSubmit={this.nextPage}>
                            <Row type="flex" justify="space-between" style={{ marginBottom: 20 }}>
                                {formItems}

                                <Col span={24}>
                                    <Form.Item >
                                        <Button type="dashed" onClick={this.addChapter} style={{ width: '100%' }}>
                                            <Icon type="plus" />
                                            Add another chapter
                                        </Button>
                                    </Form.Item>
                                </Col>
                                <Col span={9}>
                                    <Button onClick={this.previousButton} className='create-story-nav-btn'>
                                        <Icon type="left" />
                                        Previous
                                    </Button>
                                </Col>
                                <Col span={9}>
                                    <Button type="primary" htmlType="submit" className='create-story-nav-btn'>
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

const WrappedCreateStoryChapter = Form.create()(CreateStoryChapter);

const mapStoreToProps = reduxStore => ({
    template: reduxStore.template.templateNewChapterReducer,
});

export default connect(mapStoreToProps)(WrappedCreateStoryChapter);