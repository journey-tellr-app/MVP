import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorPopup from '../Contributor/ContributorPopup';
import ExistingStoryChapter from './ExistingStoryChapter';

class ExistingStorySummary extends Component {
    handlePostStory = () => {
        console.log('post story clicked');
    }

    handleAddChapter = () => {
        console.log('add story clicked');
    }

    render() {
        const { summary, chapter } = this.props;

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
                <ContributorPopup />
                {JSON.stringify(this.props.storyDetail.contributor)}<br />

                <button onClick={this.handleAddChapter}>Add Chapter</button><br />
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

export default connect(mapStoreToProps)(ExistingStorySummary);