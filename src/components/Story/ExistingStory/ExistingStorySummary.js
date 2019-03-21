import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContributorPopup from '../Contributor/ContributorPopup';
import SummaryChapterList from './SummaryChapterList';
import AddChapter from './../Chapter/AddChapter.js';
import SubHeader from '../../Common/SubHeader';

import { Row, Col, Card, Typography } from 'antd';

const { Meta } = Card;
const { Title } = Typography;

class ExistingStorySummary extends Component {
    static propTypes = {
        summary: PropTypes.array.isRequired,
        contributor: PropTypes.array.isRequired,
        chapter: PropTypes.array.isRequired,
        editMode: PropTypes.bool.isRequired,
    }

    handlePostStory = () => {
        console.log('post story clicked');
    }

    handleAddChapter = () => {
        console.log('add story clicked');
    }

    render() {
        const { summary, chapter, contributor, editMode } = this.props;
        const contributorSum = contributor.length;
        let contributorDescription;
        if (contributorSum === 0) {
            contributorDescription = '';
        } else if (contributorSum === 1) {
            contributorDescription = ` and ${contributor[0].first_name} ${contributor[0].last_name}`;
        } else if (contributorSum > 1) {
            contributorDescription = ` and ${contributorSum} contributors`;
        }

        return (
            <div>
                {/* this will check that the storyDetail reducer is populated 
                before rendering its contents */}
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <SubHeader headerText={summary[0].title} />
                    </Col>

                    <Col span={20}>
                        <Title level={4} style={{ textAlign: 'center'}}>{`By ${summary[0].author_name}${contributorDescription}`} </Title>
                    </Col>
                    {contributor.length > 0 &&
                        <Col span={10}>
                            <ContributorPopup editMode={editMode} story_id={summary[0].id}/>
                        </Col>
                    }
                </Row>

                <Card
                    style={{ width: 300 }}
                    cover={<img alt="story book cover" src={summary[0].header_photo} />}
                >
                    <Meta
                        description={summary[0].caption}
                    />
                </Card>

                {/* chapters div here */}
                {chapter &&
                    <SummaryChapterList chapter={chapter} />
                }
                <span>Add chapter</span><AddChapter chapter={chapter} storyId={summary[0].id} />
                <button onClick={this.handlePostStory}>Post Story</button>
            </div>
        )
    }
};

const mapStoreToProps = reduxStore => ({
    storyDetail: reduxStore.storyDetail,
})

export default connect(mapStoreToProps)(ExistingStorySummary);