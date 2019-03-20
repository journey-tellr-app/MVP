import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorPopup from '../Contributor/ContributorPopup';
import SummaryChapterList from './SummaryChapterList';
import AddChapter from './../Chapter/AddChapter.js';
import { Row } from 'antd';

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
                        <Row type="flex" justify="center">
                            <h1>{summary[0].title}</h1>
                            <h3><img src={summary[0].header_photo}
                                // width='100px'
                                height='200px'
                                alt="Shows what caption describes" /></h3>
                            <h3 className="caption">{summary[0].caption}</h3>
                        </Row>
                    </div> : null
                    // when the component mounts

                }
                {/* chapters div here */}
                {chapter.length > 0 &&
                <SummaryChapterList chapter={chapter} />
                }
                <span>Add chapter</span><AddChapter chapter={chapter} storyId={summary[0].id} />

                {/* contributor button here */}
                {/* when the user clicks this link, JSON line below it renders all contributors */}
                <ContributorPopup />
                {/* chapters div here */}

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