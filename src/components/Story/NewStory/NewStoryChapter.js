import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewStoryChapterItem from './NewStoryChapterItem.js';

// ant design import
import { Form, Input, Icon, Button } from 'antd';

class NewStoryChapter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chapterCount: 0,
            currentChapter: [],
        }
    }

    removeChapter = () => {

    }

    addChapter = () => {
        this.setState({
            chapterCount: this.state.chapterCount ++,
            currentChapter: {...'1'},
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // add fields to the reducer
    }

    // adds a new chapter to the story
    addNewChapter = () => {
        this.props.dispatch({ type: 'ADD_NEW_STORY_CHAPTER' });
    }

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

        // getFieldDecorator('keys', {initialValue: []});
        // const keys = getFieldValue('keys');
        // const formItems = this.props.chapter.map((item, i) => (
        //     <Form.Item
        //         {...Form(i === 0 ? formItemLayout : formItemLayoutWithoutLabel)}
        //         label={i === 0 ? 'Chapter' : ''}
        //         key={i}
        //     >
        //             <Input placeholder="chapter title" />
        //         {this.state.chapterCount > 1 ? (
        //             <Icon 
        //                 type="minus-circle-o"
        //                 disabled={items.length === 1}
        //                 onClick={() => this.removeChapter(i)}
        //             />
        //         ) : null}
        //     </Form.Item>
        // ));

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                {this.props.chapter.length > 0 ? this.props.chapter.map((item, i) => (
                    <NewStoryChapterItem key={i} chapterItem={item} i={i} />
                )) : ''}
                <Form.Item {...formItemLayoutWithoutLabel}>
                    <Button
                        type="dashed"
                        onClick={this.addChapter}
                    >
                        <Icon type="plus" /> Add Chapter
                    </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithoutLabel}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        )
    }
};

const mapStoreToProps = reduxStore => ({
    chapter: reduxStore.chapter.newStoryChapterReducer,
});

export default connect(mapStoreToProps)(NewStoryChapter);