import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Modal, Input, Icon, Button, List } from 'antd';

class NewStoryChapterModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            itemTitle: '',
            visible: false,
        }
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
        this.props.dispatch({ type: 'SET_NEW_STORY_CHAPTER', payload: { title: this.state.title,
                                                                        disabled: true, }
                            });

        // clear state - not working properly
        this.setState({
            title: ' ',
            visible: false,
        });
    }

    // do not save the entered chapter data and close modal
    cancelEntry = () => {
        this.setState({
            visible: false,
        })
    }

    render() {

        return (
            <div>
                <Button type="primary"
                        onClick={this.openChapterModal}
                >
                    Add Chapter
                </Button>
                <Modal title="New chapter title"
                       visible={this.state.visible}
                       onOk={this.addChapter}
                       onCancel={this.cancelEntry}
                       keyboard={true}
                >
                    <Input placeholder="next chapter" 
                           name="title" 
                           onChange={this.onInputChange} 
                           allowClear 
                        //    style={{ width: 340 }}
                    />
                </Modal>
            </div>
        )
    }
};

const mapStoreToProps = reduxStore => ({
    chapter: reduxStore.chapter.newStoryChapterReducer,
});

export default connect(mapStoreToProps)(NewStoryChapterModal);