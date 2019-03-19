import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Form, Input, Icon } from 'antd';

class CreateStoryChapterItem extends Component {

    handleDelete = () => {
        const action = {type:'DELETE_CHAPTER', payload: this.props.chapterId};
        this.props.dispatch(action);
    } //handleDelete

    render() {
        const { chapter, template } = this.props;
        const { getFieldDecorator } = this.props.form;

        return (
            <Form.Item
                label={`Chapter${this.props.chapterId}`}
                extra={template[this.props.chapterId].title !== '' ? template[this.props.chapterId].title : null}
            >
                {getFieldDecorator('title', 
                )(
                <Input allowClear
                       placeholder="Chapter title"
                       style={{ width: 340 }} 
                />
                )}
                <Icon className="dynamic-delete-button"
                      type="minus-circle-o"
                      onClick={() => this.handleDelete}
                />                
            </Form.Item>
        )
    }

}

const WrappedCreateStoryChapterItem = Form.create()(CreateStoryChapterItem);

const mapStoreToProps = reduxStore => ({
    template: reduxStore.template.templateNewChapterReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
});

export default connect(mapStoreToProps)(WrappedCreateStoryChapterItem);