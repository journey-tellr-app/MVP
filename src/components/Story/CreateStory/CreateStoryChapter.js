import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateStorySteps from './CreateStorySteps.js'
import CreateStoryChapterItem from './CreateStoryChapterItem.js';

// ant design import
import { Form, Input, Button, Icon } from 'antd';

let id = 1;

class CreateStoryChapter extends Component {

    // go bact to the previous page
    prevousButton = () => {
        this.props.history.push('/choose-template/');
    }

    // called when create story button is pressed
    // packages local state and redux reducer data and calls the saga to create database entries
    nextPage = (event) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((error, values) => {
            if (!error) {
                console.log('Received values of form: ', values);
            }
        });
    } // end createChapter

    render() {

        const { chapter, template } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const chapterArray = chapter.length > template.length ? chapter.map((item, i) => ( i )) : template.map((item, i) => (i));
        console.log(chapterArray);

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

        // getFieldDecorator('keys', { initialValue: [0] });
        // const keys = getFieldValue('keys');
        // const formItems = keys.map((k, index) => (
        // getFieldDecorator('chapter', { initialValue: chapter});
        // const chapterArray = getFieldValue('chapter');
        // const formItems = chapterArray.map((k, index) => (
        //     <Form.Item index={formItemLayout}
        //                label="Chapter"
        //                required={true}
        //                key={k}
        //     >
        //         {getFieldDecorator(`title[${k}]`, {
        //             validateTrigger: ['onChange', 'onBlur'],
        //             rules: [{ required: true,
        //                       whitespace: true,
        //                       message: "Please enter a chapter title or delete.",
        //                    }],
        //         })(
        //             <Input style={{ width: '60%', marginRight: 8 }} />
        //         )}
        //         {chapterArray.length > 1 ? (
        //             <Icon
        //             className="dynamic-delete-button"
        //             type="minus-circle-o"
        //             disabled={chapterArray.length === 1}
        //             onClick={() => this.remove(k)}
        //             />
        //         ) : null}
        //     </Form.Item>
        // ));

        return (
            <Form layout="vertical" onSubmit={this.nextPage}>
                <h2>Add Chapters</h2>
                <CreateStorySteps current={2} />
                {chapter.length > 0 ? chapterArray.map((item, i) => ( <CreateStoryChapterItem key={i} chapterId={i} /> )) : ''}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
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
    template: reduxStore.template.templateNewChapterReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
});

export default connect(mapStoreToProps)(WrappedCreateStoryChapter);