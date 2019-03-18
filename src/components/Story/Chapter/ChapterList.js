import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Input, Icon, List } from 'antd';

class ChapterList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            itemTitle: '',
        }
    }

    // removes a user created chapter
    removeChapter = (chapterIn) => {
        this.props.dispatch({ type: 'REMOVE_NEW_STORY_CHAPTER', payload: chapterIn });
    } // end removeChapter

    // allow for editing a chapter title
    editChapter = (chapterIn) => {
        // toggle the input field from edit to save
        let toggle = !chapterIn.disabled;
        chapterIn.disabled = toggle;

        // change the title if changed otherwise keep the same
        chapterIn.title = this.state.itemTitle !== ' ' ? this.state.itemTitle : chapterIn.itemTitle;
        this.props.dispatch({ type: 'UPDATE_NEW_STORY_CHAPTER', payload: chapterIn });
    } // end editChapter

    // function for setting local state with user input
    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    } // end onInputChange

    render() {

        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.chapter}
                    renderItem={(item, i) => (
                        <List.Item actions={[<Icon type={item.disabled ? "edit" : "save"} theme="twoTone" onClick={() => this.editChapter(item)} />,
                                             <Icon type="delete" style={{color:"red"}}theme="filled" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.removeChapter(item)}} />]}>
                            <List.Item.Meta
                                title={<p>Chapter - {i + 1}</p>}
                                description={item.title}
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
            </div>
        )
    }
};

// const mapStoreToProps = reduxStore => ({
//     chapter: reduxStore.chapter.newStoryChapterReducer,
// });

export default connect()(ChapterList);