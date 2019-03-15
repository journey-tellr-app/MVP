import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Divider } from 'antd';

import ExistingStoryChapter from '../ExistingStory/ExistingStoryChapter';
import LikeButton from './../../Common/LikeButton';

import ContributorPopup from '../Contributor/ContributorPopup';
import AddChapterPopup from './Chapters/AddChapterPopup';

import EditChapterPage from './../NewStory/EditChapterPage';

class ExistingStory extends Component {

    componentDidMount() {
        const { params } = this.props.match
        this.props.dispatch({
            type: 'GET_INDIVIDUAL_STORY',
            payload: params.id
        });
        this.props.dispatch({
            type: 'GET_STORY_CHAPTER_DETAIL',
            payload: params.id
        });


    }

    handlePostStory = () => {
        console.log('post story clicked');
    }

    handleAddChapter = () => {
        console.log('add story clicked');
    }

    handleGetContributors = () => {
        this.props.dispatch({
            type: 'GET_STORY_CONTRIBUTORS',
            payload: this.props.storyDetail.summary[0].id
        });
    }

    // renderChapter = () => {
    //     return this.props.chapter.map((chap, i) => {
    //         return <ExistingStoryChapter key={i} chap={chap} />
    //     })
    // }

    render() {
        const { summary, likes, contributor,
            chapter } = this.props.storyDetail

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
                            alt="Shows what caption describes" /></h3>
                        <h3>Caption: {summary[0].caption}</h3>

                    </div> : null
                    // when the component mounts

                }
                {/* chapters div here */}
                <ExistingStoryChapter chapter={chapter} />
                {/* contributor button here */}
                    {/* when the user clicks this link, JSON line below it renders all contributors */}
                    <a onClick={this.handleGetContributors}><u>Contributors: </u></a>
                    {JSON.stringify(this.props.storyDetail.contributor)}<br/>
                    <ContributorPopup />
                    <AddChapterPopup />
                    

                {
                    this.props.storyDetail.summary.length !== 0 ?
                        <EditChapterPage storyId={this.props.storyDetail.summary[0].id} /> : null
                }
                    
                    <button onClick={this.handleAddChapter}>Add Chapter</button><br/>
                    <button onClick={this.handlePostStory}>Post Story</button>
                

                {/* chapters div here */}

                {/* post story button here only if author of story */}
            </div>
        )
    }
};
const mapStoreToProps = reduxStore => ({
    storyDetail: reduxStore.storyDetail,
})

export default connect(mapStoreToProps)(ExistingStory);