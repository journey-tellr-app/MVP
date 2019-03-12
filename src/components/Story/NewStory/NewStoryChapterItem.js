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
            <div>
                <Form.Item {...formItemLayoutWithoutLabel}>
                    <Input value={this.props.chapterItem} disabled={true} />
                </Form.Item>
                <Form.Item>
                    <Icon 
                        type="minus-circle-o"
                        onClick={this.removeChapter}
                    />
                </Form.Item>
            </div>
        )
    }
};


export default connect()(NewStoryChapterItem);