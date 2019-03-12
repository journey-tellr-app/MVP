import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Form, Input, Icon, Button } from 'antd';

class NewStoryChapterItem extends Component {

    removeChapter = () => {
        this.props.dispatch({ type: 'REMOVE_NEW_STORY_CHAPTER', payload: this.props.chapterItem });
    }

    // addChapter = () => {
    //     const {form} = this.props;
    //     const keys = form.getFieldValue('keys');
    //     const nextKeys = keys.concat(id++);

    //     // inform the form of added chapter
    //     form.setFieldsValue({keys: nextKeys});
    // }

    render() {

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

        return (
            <Form.Item
                // {(i === 0 ? formItemLayout : formItemLayoutWithoutLabel)}
                
                label={this.props.chapterItem === 0 ? 'Chapter' : ''}
            >
                <p>{this.props.chapterItem}</p>
                <Icon 
                    type="minus-circle-o"
                    onClick={this.removeChapter}
                />
            </Form.Item>
        )
    }
};


export default connect()(NewStoryChapterItem);