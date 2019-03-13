import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import ExistingStoryChapter from '../ExistingStory/ExistingStoryChapter';

class ExistingStory extends Component {

    componentDidMount(){
        this.props.dispatch({type:'GET_INDIVIDUAL_STORY',
                             payload: this.props.match.params.id});
    }

    // renderChapter = () => {
    //     return this.props.chapter.map((chap, i) => {
    //         return <ExistingStoryChapter key={i} chap={chap} />
    //     })
    // }

    render() {
        return (
            <div>
                {/* {JSON.stringify(this.props)} */}

                {/* this will check that the storyDetail reducer is populated 
                before rendering its contents */}
                {
                this.props.story.storyDetail.length !== 0 ? 
                <div>
                    <h1>Title: {this.props.story.storyDetail[0].title}</h1>
                    <h3>Photo: <img src={this.props.story.storyDetail[0].header_photo}
                                width='150px' 
                                height='100px' 
                                alt="Shows what caption describes"/></h3>
                    <h3>Caption: {this.props.story.storyDetail[0].caption}</h3>
                </div> : null 
                }
                
                
                
               
            </div>
        )
    }
};
const mapStoreToProps = reduxStore => ({
    story: reduxStore.story,
    chapter: reduxStore.chapter,
})

export default connect(mapStoreToProps)(ExistingStory);