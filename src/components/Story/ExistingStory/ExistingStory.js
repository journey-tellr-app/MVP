import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider } from 'antd';
import ExistingStoryChapter from '../ExistingStory/ExistingStoryChapter';

class ExistingStory extends Component {

    componentDidMount(){
        this.props.dispatch({type:'GET_INDIVIDUAL_STORY',
                             payload: this.props.match.params.id});

                
    }

    handlePostStory = () => {
        console.log('post story clicked');
    }

    handleAddChapter = () => {
        console.log('add story clicked');
    }

    handleGetContributors = () => {
        this.props.dispatch({type: '', 
                             payload: ''})
    }

    // renderChapter = () => {
    //     return this.props.chapter.map((chap, i) => {
    //         return <ExistingStoryChapter key={i} chap={chap} />
    //     })
    // }

    render() {
        const { contributedStoryReducer,
            summary,
            likes,
            contributor,
            chapter, } = this.props.storyDetail

        return (
            <div>
                {/* this will check that the storyDetail reducer is populated 
                before rendering its contents */}
                {summary.length !== 0 ? 
                <div>
                    <h1>Title: {summary[0].title}</h1>
                    <h3>Photo: <img src={summary[0].header_photo}
                                width='150px' 
                                height='100px' 
                                alt="Shows what caption describes"/></h3>
                    <h3>Caption: {summary[0].caption}</h3>

                    <a onClick={this.handleGetContributors}><u>Contributors: </u></a><br/>
                    <button onClick={this.handleAddChapter}>Add Chapter</button><br/>
                    <button onClick={this.handlePostStory}>Post Story</button>
                </div> : null 
                // when the component mounts

                }
                {/* chapters div here */}

                {/* contributor button here */}

                {/* post story button here only if author of story */}
                
            </div>
        )
    }
};
const mapStoreToProps = reduxStore => ({
    storyDetail: reduxStore.storyDetail,
    chapter: reduxStore.chapter,
})

export default connect(mapStoreToProps)(ExistingStory);