import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContributorPopup from '../Contributor/ContributorPopup';
import SummaryChapterList from './SummaryChapterList';
import SubHeader from '../../Common/SubHeader';
import EditButton from './EditButton';
import FinalizeStoryButton from './FinalizeStoryButton';

import { Row, Col, Card, Typography, Divider, PageHeader, Button } from 'antd';

const { Meta } = Card;
const { Title, Paragraph } = Typography;

class ExistingStorySummary extends Component {
    static propTypes = {
        summary: PropTypes.array.isRequired,
        contributor: PropTypes.array.isRequired,
        chapter: PropTypes.array.isRequired,
        editMode: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
    }

    render() {
        const { summary, chapter, contributor, editMode, user } = this.props;
        const { title, author_name, id, header_photo, caption, intro } = summary[0];
        const contributorSum = contributor.length;
        let contributorDescription;
        if (contributorSum === 0) {
            contributorDescription = '';
        } else if (contributorSum === 1) {
            contributorDescription = ` and ${contributor[0].first_name} ${contributor[0].last_name}`;
        } else if (contributorSum > 1) {
            contributorDescription = ` and ${contributorSum} contributors`;
        }

        console.log('in existingstory: ', this.props);

        return (
            <div>
                {/* this will check that the storyDetail reducer is populated 
                before rendering its contents */}
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <SubHeader headerText='Story Summary' />
                    </Col>
                    <PageHeader
                        title={title}
                        subTitle={`By ${author_name}${contributorDescription}`}
                    />
                    {editMode &&
                        <Col span={8} style={{ marginBottom: 20 }}>
                            <EditButton
                                valueToEdit={title}
                                type='Story'
                                name='Title'
                                id={id} />
                        </Col>
                    }
                    {contributor.length > 0 &&
                        <Col span={12} style={{ marginBottom: 20 }}>
                            <ContributorPopup editMode={editMode} story_id={id} />
                        </Col>
                    }
                </Row>

                <Card
                    style={{
                        width: 300, display: 'block', margin: 'auto', marginBottom: 10,
                    }}
                    cover={<img alt="story book cover" src={header_photo} />}
                >
                    <Meta
                        description={caption}
                    />
                </Card>

                {editMode &&
                    <Row type='flex' justify='center'>
                        <Col>
                            <EditButton
                                valueToEdit={caption}
                                type='Story'
                                name='Caption'
                                id={id} />
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                }


                <Row type='flex' justify='center'>
                    <Divider>
                        <Title level={4} style={{ textAlign: 'center', marginTop: 10 }}>Introduction</Title>
                    </Divider>
                    {intro !== null ?
                        <Col span={18}>
                            <Paragraph>
                                {intro}
                            </Paragraph>
                        </Col>
                        :
                        <Col span={18}>
                            <Paragraph> This story has no introduction yet! </Paragraph>
                        </Col>

                    }
                    {editMode &&
                        <Col span={18}>
                            <EditButton
                                valueToEdit={intro}
                                type='Story'
                                name='Intro'
                                id={id} />
                        </Col>
                    }

                </Row>


                {/* chapters div here */}
                {chapter &&
                    <SummaryChapterList chapter={chapter} storyId={summary[0].id} editMode={editMode} />
                }
                <FinalizeStoryButton />
            </div>
        )
    }
};

const mapStoreToProps = reduxStore => ({
    storyDetail: reduxStore.storyDetail,
    user: reduxStore.user.userInfo,
})

export default connect(mapStoreToProps)(ExistingStorySummary);