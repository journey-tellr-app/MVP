import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorPopup from '../Contributor/ContributorPopup';
import SummaryChapterList from './SummaryChapterList';
import EditChapterPage from '../NewStory/EditChapterPage';

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
                {chapter.length > 0 &&
                <SummaryChapterList chapter={chapter} />
                }
                

                {/* contributor button here */}
                {/* when the user clicks this link, JSON line below it renders all contributors */}
                <ContributorPopup />
                {/* chapters div here */}
                {this.props.storyDetail.summary.length !== 0 ?
                    <EditChapterPage storyId={this.props.storyDetail.summary[0].id} />
                    :
                    null
                }
                {/* post story button here only if author of story */}
                <button onClick={this.handlePostStory}>Post Story</button>
            </div>
        )
    }
};

const mapStoreToProps = reduxStore => ({
    storyDetail: reduxStore.storyDetail,
})

export default connect(mapStoreToProps)(ExistingStorySummary);