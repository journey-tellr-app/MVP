import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateStorySteps from './CreateStorySteps.js'

// ant design import
import { Form, Input, Button, Icon } from 'antd';

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
                if(values.keys.length > 0) {
                    // filter out empty chapters that have been removes
                    let filterValues = values.title.filter((item) => ({title: item}));
                    // package the chapters in an object for the reducer
                    let newPayload = filterValues.map((ch) => ({title: ch,
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

        const { template, chapter } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const formItemLayoutWithOutLabel = {
            wrapperCol: {
              xs: { span: 24, offset: 0 },
              sm: { span: 20, offset: 4 },
            },
        };

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

        // create initial values for the 'keys' to show template chapters
        const tempArray = template.length > 0 ? template.map((item, i) => (i)) : [];
        const chapArray = chapter.length > 0 ? chapter.map((item,i) => (i)) : [];
        const useArray = chapter.length !== 0 ? chapArray : tempArray;

        // used in the formItems map to display a user prompt if a template
        const isTemplate = template.length > 0 ? true : false;
        
        getFieldDecorator('keys', { initialValue: useArray });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item index={formItemLayout}
                       label="Chapter"
                       extra={isTemplate && (k >= 0 && k <= (template.length - 1)) ? template[k].text : '' }
                       required={true}
                       key={k}
            >
                {getFieldDecorator(`title[${k}]`, {
                    initialValue: chapter.length > 0 && chapter.length === k ? chapter[k].title : '',
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{ required: true,
                              whitespace: true,
                              message: "Please enter a chapter title or delete.",
                           }],
                })(
                    <Input style={{ width: '60%', marginRight: 8 }} />
                )}
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.removeChapter(k)}
                />
            </Form.Item>
        ));

        return (
            <Form layout="vertical" onSubmit={this.nextPage}>
                <h2>Add Chapters</h2>
                <CreateStorySteps current={2} />
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addChapter} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add another chapter
                    </Button>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                            htmlType="submit"
                    >
                        Next
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.previousButton}>
                        Previous
                    </Button>
                </Form.Item>
            </Form>
        )
    }

}

const WrappedCreateStoryChapter = Form.create()(CreateStoryChapter);

const mapStoreToProps = reduxStore => ({
    chapter: reduxStore.chapter.newStoryChapterReducer,
    template: reduxStore.template.templateNewChapterReducer,
});

export default connect(mapStoreToProps)(WrappedCreateStoryChapter);