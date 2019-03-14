import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Form, Input, Icon, Button, List } from 'antd';

class EditChapterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
        }
    }

    // function for setting local state with user input
    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    } // end onInputChange

    // submits the currently entered field and allows the user to create another chapter
    addChapter = () => {
        // add 1 to the length of existing chapters to get the new chapter order
        let newOrder = this.props.chapter.length + 1;

        // create an array to use the existing chapter router POST route
        let chapterArray = [];
        chapterArray.push({ title: this.state.title, order: newOrder, disabled: true, });

        // package the data to be sent to the server
        let dataToSend = { chapter: chapterArray,
                           storyId: this.props.storyId,
                         };
        // call reduxSaga for adding a new chapter passing the chapter array and story id
        this.props.dispatch({ type: 'ADD_EXISTING_STORY_CHAPTER', payload: dataToSend });

        // clear state - not quite working properly
        this.setState({
            title: ' ',
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
    chapter: reduxStore.storyDetail.chapter,
});

export default connect(mapStoreToProps)(EditChapterPage);