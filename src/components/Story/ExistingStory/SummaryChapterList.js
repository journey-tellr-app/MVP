import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

<<<<<<< HEAD
import { List, Button, Row, Divider } from 'antd';
=======
import AddChapter from './../Chapter/AddChapter.js';

import { List, Row, Typography, Divider, Col, Avatar } from 'antd';

const { Title } = Typography;
>>>>>>> d5099c5c1dd306e5549f185ca9edfbec6a1f402c

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
<<<<<<< HEAD
                <Divider><h3>Chapters</h3></Divider>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.props.chapter}
                    renderItem={item => {
                        const { order, chapter_photo, title } = item;

                        return item.text !== null ? 
                        (
                            <List.Item
                                key={title} type="flex" align="top" className="chapter-contents"
                                extra={<img width={200} alt={`for chapter ${order}`} src={`${chapter_photo}`} />}
                            >
                                <List.Item.Meta
                                    title={<Link to={`${this.props.match.url}/chapter/${order}`}>{title}</Link>}
                                    description={this.handleDescription(item.text)}
                                />
                                <Row type="flex" justify="end"><Button onClick={() => this.readChapter(item)}>Read Chapter</Button></Row>
                                
                            </List.Item>
                        ) : ((
                            <List.Item
                                key={title} type="flex" align="top" className="chapter-contents"
                                extra={<img width={200} alt={`for chapter ${order}`} src={`${chapter_photo}`} />}
                            >
                                <List.Item.Meta
                                    title={<Link to={`${this.props.match.url}/chapter/${order}`}>{title}</Link>}
                                />
                                <Row type="flex" justify="end"><Button onClick={() => this.readChapter(item)}>Read Chapter</Button></Row>
                                
                            </List.Item>
                        ))

                        
                    }}
                />
=======
                <Divider>
                    <Title level={4} style={{ textAlign: 'center', marginTop: 10 }}>Chapters</Title>
                </Divider>
                <Row type='flex' align='middle' justify='center'>
                    {editMode &&
                        <Col>
                            <AddChapter chapter={chapter} storyId={storyId} />
                        </Col>
                    }

                    <Col span={18}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
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

>>>>>>> d5099c5c1dd306e5549f185ca9edfbec6a1f402c
            </div>
        )
    }
};

const SummaryChapterListWithRouter = withRouter(SummaryChapterList);

export default connect()(SummaryChapterListWithRouter);