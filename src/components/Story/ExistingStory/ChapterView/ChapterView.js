import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import ImageUpload from './../../../ImageUpload/ImageUpload.js';
import EditButton from '../EditButton';
import FinalizeStoryButton from '../FinalizeStoryButton';
import SubHeader from '../../../Common/SubHeader';

import { PageHeader, Pagination, Card, Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

class ChapterView extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        contributor: PropTypes.array.isRequired,
        editMode: PropTypes.bool.isRequired,
    };

    turnPage = (page, pageSize) => {
        this.props.history.push(`${page - 1}`)
    }

    render() {
        //took out likes for now
        const { summary, chapter, contributor, editMode } = this.props;
        const { chapterId } = this.props.match.params;
        console.log(chapterId, chapter);

        // console.log('editMode:', this.state.editMode);
        const contributorSum = contributor.length;
        let contributorDescription;
        if (contributorSum === 0) {
            contributorDescription = '';
        } else if (contributorSum === 1) {
            contributorDescription = ' and one contributor';
        } else if (contributorSum < 2) {
            contributorDescription = ` and ${contributorSum} contributors`;
        }
        const currChapter = chapter[chapterId];
        console.log('currChapter', currChapter);

        return (
            <div>
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={24}>
                        <SubHeader headerText='Chapter Details' />
                    </Col>
                </Row>
                {currChapter !== undefined && summary.length > 0 ?
                    <div>
                        <Row type='flex' justify="space-around" align="middle">
                            <PageHeader
                                title={`Chapter ${currChapter.order}: ${currChapter.title}`}
                                subTitle={`in story "${summary[0].title}" by ${summary[0].author_name}${contributorDescription}. `}
                            />
                            {editMode &&
                                <Col style={{ marginBottom: 20 }}>
                                    <EditButton
                                        valueToEdit={currChapter.title}
                                        type='Chapter'
                                        name='Title'
                                        id={currChapter.id} />
                                </Col>
                            }
                        </Row>
                        <Card
                            style={{ width: 300, display: 'block', margin: 'auto', marginBottom: 10, }}
                            cover={<img alt={`Chapter ${chapterId} header`} src={currChapter.chapter_photo} />}>
                            <Card.Meta
                                description={currChapter.text}
                            />
                        </Card>

                        {editMode &&
                            <Row type='flex' justify='space-around' style={{marginBottom: 20}}>
                                <Col>
                                    <EditButton valueToEdit={currChapter.text}
                                        type='Chapter'
                                        name='Text'
                                        id={currChapter.id} />
                                </Col>
                                <Col>
                                    <ImageUpload
                                        photoDetails={{
                                            typeOfPhoto: 'CHAPTER',
                                            title: "Change Picture",
                                            chapterId: currChapter.id,
                                        }}
                                        editMode={editMode} />
                                </Col>
                            </Row>
                        }
                        
                        <Row type="flex" justify="center" align="middle">
                            <Pagination
                            current={Number(chapterId + 1)}
                            pageSize={1}
                            total={Number(chapter.length)}
                            onChange={this.turnPage} />
                        </Row>
                        <FinalizeStoryButton />
                    </div>
                    :
                    <p> Page is loading.</p>
                }



            </div>
        )
    }
};

const ChapterViewWithRouter = withRouter(ChapterView);

export default connect()(ChapterViewWithRouter);