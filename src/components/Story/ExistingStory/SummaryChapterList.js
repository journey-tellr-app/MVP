import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import AddChapter from './../Chapter/AddChapter.js';

import { List, Row, Typography, Divider, Col, Avatar } from 'antd';

const { Title } = Typography;

class SummaryChapterList extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        storyId: PropTypes.number.isRequired,
        chapter: PropTypes.array.isRequired,
        editMode: PropTypes.bool.isRequired,
    };

    readChapter = (e) => {
        this.props.history.push(`/existing-story/${e.story_id}/chapter/${e.id}`)
    }

    render() {
        const { chapter, storyId, editMode } = this.props
        return (
            <div >
                {/* this will only show chapters if user is editor so they can see add chapter button */}
                {(editMode || chapter.length > 0) &&
                    <div>
                        <Divider style={{ marginTop: 30, marginBottom: 0 }}>
                            <Title level={4} style={{ textAlign: 'center' }}>Chapters</Title>
                        </Divider>
                        <Row type='flex' align='middle' justify='center'>
                            {editMode &&
                                <Col>
                                    <AddChapter chapter={chapter} storyId={storyId} />
                                </Col>
                            }
                        </Row>
                    </div>
                }
                {chapter.length > 0 ?
                    <Row type='flex' align='middle' justify='center'>
                        <Col span={18}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                pagination={{
                                    pageSize: 3,
                                }}
                                dataSource={this.props.chapter}
                                renderItem={item => {
                                    const { chapter_photo, title, text } = item;
                                    let textToShow = '';
                                    if (text !== null) {
                                        textToShow = text.substring(0, 40) + '...';
                                    }
                                    let imgToShow = './images/placeholder.png';
                                    if (chapter_photo !== null) {
                                        imgToShow = chapter_photo;
                                    }
                                    return (
                                        <List.Item
                                            key={title}
                                        >
                                            <List.Item.Meta
                                                avatar={<Link to={`${this.props.match.url}/chapter/${this.props.chapter.indexOf(item)}`}><Avatar src={imgToShow} shape="square" size={64} /></Link>}
                                                title={<Link to={`${this.props.match.url}/chapter/${this.props.chapter.indexOf(item)}`}>{title}</Link>}
                                                description={<Link to={`${this.props.match.url}/chapter/${this.props.chapter.indexOf(item)}`}>{textToShow}</Link>}
                                            />
                                        </List.Item>

                                    )
                                }}
                            />
                        </Col>
                    </Row>
                    :
                    null
                }
            </div >
        )
    }
};

const SummaryChapterListWithRouter = withRouter(SummaryChapterList);

export default connect()(SummaryChapterListWithRouter);