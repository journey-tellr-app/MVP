import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Form, Input, Icon, Button } from 'antd';

let id = 0;
let testArray = [];

class NewStoryChapterItem extends Component {

    removeChapter = (chapterKey) => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        if(keys.length === 1) {
            return;
        }

        // filter through chapters and remove the selected chapter
        form.setFieldsValue({keys: keys.filter(key => key !== chapterKey),});
    }

    addChapter = () => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);

        // inform the form of added chapter
        form.setFieldsValue({keys: nextKeys});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // add fields to the reducer
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: { 
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const formItemLayoutWithoutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },                
            }
        };
        // getFieldDecorator('keys', {initialValue: []});
        // const keys = getFieldValue('keys');
        const formItems = testArray.map((items, i) => (
            <Form.Item
                {...Form(i === 0 ? formItemLayout : formItemLayoutWithoutLabel)}
                label={i === 0 ? 'Chapter' : ''}
                key={items}
            >
                {getFieldDecorator(`names[${items}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: 'Chapter is required or delete the chapter'
                    }],
                })(
                    <Input placeholder="chapter title" />
                )}
                {testArray.length > 1 ? (
                    <Icon 
                        type="minus-circle-o"
                        disabled={testArray.length === 1}
                        onClick={() => this.removeChapter(items)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item {...formItemLayoutWithoutLabel}>
                    <Button
                        type="dashed"
                        onClick={this.addChapter}
                    >
                        <Icon type="plus" /> Add Chapter
                    </Button>                    
                </Form.Item>
            </Form>
        )
    }
};

const WrappedNewStoryChapterItem = Form.create({ name: 'new_story_chapter_item' })(NewStoryChapterItem);

export default connect()(WrappedNewStoryChapterItem);