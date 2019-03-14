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
        this.props.dispatch({ type: 'SET_NEW_STORY_CHAPTER', payload: { title: this.state.title,
                                                                        order: this.state.order,
                                                                        disabled: true, }
                            });
        let newOrder = this.state.order += 1;
        this.setState({
            title: ' ',
            order: newOrder,
        });
    }

    render() {

        return (
            <div>
                {this.props.chapter.length != 0 ?
                    <List
                        itemLayout="horizontal"
                        dataSource={this.props.chapter}
                        renderItem={(item, i) => (
                            <List.Item actions={[<Icon type={item.disabled ? "edit" : "save"} theme="twoTone" onClick={() => this.editChapter(item)} />,
                                                 <Icon type="delete" style={{color:"red"}}theme="filled" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.removeChapter(item)}} />]}>
                                <List.Item.Meta
                                    title={<p>Chapter - {i + 1}</p>}
                                />
                                <Input placeholder={item.title}
                                       name="itemTitle"
                                       disabled={item.disabled && true}
                                       defaultValue={item.title}
                                       style={{ width: 200 }}
                                       onChange={this.onInputChange} /> 
                            </List.Item>
                        )}
                    />
                : '' }
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