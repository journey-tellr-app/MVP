import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Form, Input, Icon, Button, List } from 'antd';

class NewStoryChapter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newChapter: '',
        }
    }

    // removes a user created chapter
    removeChapter = (chapterIn) => {
        this.props.dispatch({ type: 'REMOVE_NEW_STORY_CHAPTER', payload: chapterIn });
    } // end removeChapter

    // function for setting local state with user input
    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    } // end onInputChange

    // submits the currently entered field and allows the user to create another chapter
    addChapter = () => {
        this.props.dispatch({ type: 'SET_NEW_STORY_CHAPTER', payload: { title: this.state.newChapter }});
        this.setState({
            newChapter: '',
        });
    }

    render() {

        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.chapter}
                    renderItem={(item, i) => (
                        <List.Item actions={[<Icon type="minus-circle-o" onClick={() => this.removeChapter(item)} />]}>
                            <List.Item.Meta
                                title={<p>Chapter - {i + 1}</p>}
                            />
                            <div>{item.title}</div>
                        </List.Item>
                    )}
                />
                <Input placeholder="chapter title" name="newChapter" onChange={this.onInputChange} />
                <Button
                    type="dashed"
                    onClick={this.addChapter}
                >
                    <Icon type="plus" /> Add Chapter
                </Button>
            </div>
        )
    }
};

const mapStoreToProps = reduxStore => ({
    chapter: reduxStore.chapter.newStoryChapterReducer,
});

export default connect(mapStoreToProps)(NewStoryChapter);