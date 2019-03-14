import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Form, Input, Icon, Button, List } from 'antd';

class NewStoryChapter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            itemTitle: '',
            order: 0,
        }
    }

    // removes a user created chapter
    removeChapter = (chapterIn) => {
        this.props.dispatch({ type: 'REMOVE_NEW_STORY_CHAPTER', payload: chapterIn });
    } // end removeChapter

    // allow for editing a chapter title
    editChapter = (chapterIn) => {
        let toggle = !chapterIn.disabled;
        chapterIn.disabled = toggle;
        console.log(chapterIn.itemTitle);
        chapterIn.title = this.state.itemTitle != ' ' ? this.state.itemTitle : chapterIn.itemTitle;
        this.props.dispatch({ type: 'UPDATE_NEW_STORY_CHAPTER', payload: chapterIn });
    } // end editChapter

    // function for setting local state with user input
    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    } // end onInputChange

    // submits the currently entered field and allows the user to create another chapter
    addChapter = () => {
        let chapterArray = [];
        chapterArray.push({ title: this.state.title, order: this.state.order, disabled: true, });
        let dataToSend = { chapter: chapterArray,
                           storyId: this.props.storyId,
                         };

        this.props.dispatch({ type: 'ADD_EXISTING_STORY_CHAPTER', payload: dataToSend });
        let newOrder = this.state.order += 1;
        this.setState({
            title: ' ',
            order: newOrder,
        });
    }

    render() {

        return (
            <div>
                <Input placeholder="next chapter" name="title" onChange={this.onInputChange} allowClear style={{ width: 340 }} />
                <Button
                    type="primary"
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