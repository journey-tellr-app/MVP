import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import NewStoryChapter from './NewStoryChapter.js';
import TemplateChapter from './TemplateChapter.js';
import ContributorList from './../Contributor/ContributorList.js';

// ant design import
import { Form, Input, Icon, Button } from 'antd';

class NewStoryMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            header_photo: '',
            caption: '',
        }
    }

    // function for setting local state with user inputs
    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    } // end onInputChange

    createStory = (event) => {
        // event.preventDefault();
        // add fields to the reducer
        let storyDataToSend = '';
        let chapterDataToSend = this.props.chapter;

        if(this.props.story.title != '') {
            storyDataToSend = { title: this.props.story.title,
                                header_photo: this.props.story.placeholder_image,
                                caption: this.props.story.caption,
                                intro: this.props.story.intro,
                                is_template: true,
                              };
        } else {
            storyDataToSend = { title: this.state.title,
                                header_photo: this.state.header_photo,
                                caption: this.state.caption,
                                intro: '',
                                is_template: false,
                              };
        }

        let completeDataToSend = { story: storyDataToSend, chapter: chapterDataToSend};

        this.props.dispatch({ type: 'ADD_NEW_STORY', payload: completeDataToSend });

    }

    render() {

        return (
            <div>
                <h2>Create a Story</h2>
                <ChooseTemplate />
                {this.props.story.title != '' ? <h4>{this.props.story.title}</h4> : <input name="title" onChange={this.onInputChange} />}
                <h4>Image goes here</h4>
                {this.props.story.title != '' ? <p>{this.props.story.caption}</p> :<input name="caption" onChange={this.onInputChange} />}
                {/* {this.props.chapter.length > 0 ? <TemplateChapter chapter={this.props.chapter} /> : <NewStoryChapter />} */}
                <NewStoryChapter />
                <ContributorList />
                <Button onClick={this.createStory}>Create Story</Button>
            </div>
        )
    }

}

const mapStoreToProps = reduxStore => ({
    story: reduxStore.story.newStoryReducer,
    chapter: reduxStore.chapter.newStoryChapterReducer,
});

export default connect(mapStoreToProps)(NewStoryMain);