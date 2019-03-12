import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import ExistingStoryChapter from '../ExistingStory/ExistingStoryChapter';

class ExistingStory extends Component {
    componentDidMount(){
        this.props.dispatch  //get story and chapters here
    }

    renderChapter = () => {
        return this.props.chapter.map((chap, i) => {
            return <ExistingStoryChapter key={i} chap={chap} />
        })
    }
    render() {
        return (
            <div>
                <h1>Existing Story</h1>
                <div>
                    <h1>Title: {this.props.story.title}</h1> {/*Title: to be deleted after routes are created */}
                </div>
                <div>
                    <h1>Photo: <img src={this.props.story.header_photo} width="100%" height="90" alt="Shows what caption describes"/></h1>
                    <h3>Caption: {this.props.story.caption} </h3>
                </div>
                <Divider />  {/*Ant Design thing. Will probably make chapters more distinct */}
                {this.renderChapter()}  {/*Will probably have to add a delay to make sure everything is recieved from reducers. */}
            </div>
        )
    }
};
const mapStoreToProps = reduxStore => ({
    story: reduxStore.story,
    chapter: reduxStore.chapter,
})

export default connect(mapStoreToProps)(ExistingStory);