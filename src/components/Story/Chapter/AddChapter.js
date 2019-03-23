import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Modal, Input, Button } from 'antd';

class AddChapter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            visible: false,
        }

        this.baseState = this.state;
    }

    // open the chapter modal
    openChapterModal = () => {
        this.setState({
            visible: true,
        });
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
        chapterArray.push({ title: this.state.title,
                            text: 'This is a newly made chapter.',
                            order: newOrder,
                            chapter_photo: '/images/placeholder.png',
                            disabled: true,
                         });

        // package the data to be sent to the server
        let dataToSend = { chapter: chapterArray,
                           storyId: this.props.storyId,
                         };
        // call reduxSaga for adding a new chapter passing the chapter array and story id
        this.props.dispatch({ type: 'ADD_EXISTING_STORY_CHAPTER', payload: dataToSend });

        // set state to intial value
        this.setState(this.baseState);
    } // end addChapter

    // do not save the entered chapter data and close modal
    cancelEntry = () => {
        this.setState({
            visible: false,
        })
    } // end cancelEntry

    render() {

        return (
            <div>
                <Button 
                    onClick={this.openChapterModal} 
                    className='edit-button'>
                    Add Chapter
                </Button>
                <Modal title="New chapter title"
                       visible={this.state.visible}
                       onOk={this.addChapter}
                       okText='Add Chapter'
                       onCancel={this.cancelEntry}
                       keyboard={true}
                >
                    <Input placeholder="next chapter" 
                           name="title"
                           value={this.state.title}
                           onChange={this.onInputChange} 
                           allowClear 
                    />
                </Modal>
            </div>
        )
    }
};

export default connect()(AddChapter);