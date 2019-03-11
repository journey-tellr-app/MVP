import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import EditChapterPage from './EditChapterPage.js';
import NewStoryChapter from './NewStoryChapter.js';

class NewStoryMain extends Component {

    render() {
        return (
            <div>
                <h2>Create a Story</h2>
                <h4>{this.props.reduxStore.story.title}</h4>
                <img src={this.props.reduxStore.story.header_photo} />
                <p>{this.props.reduxStore.story.caption}</p>
                <h4>Chapters</h4> { /* conditionally rendered - replace with  */ }
                <h4>Contributors</h4> { /* conditionally rendered - replace with new and edit contributor js files */ }
            </div>
        )
    }

}

mapStoreToProps = reduxStore ({
    reduxStore,
});

export default connect(maptoreToProps)(NewStoryMain);