import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { List, Button, Row, Typography, Divider } from 'antd';

const { Title } = Typography;

class SummaryChapterList extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    readChapter = (e) => {
        this.props.history.push(`/existing-story/${e.story_id}/chapter/${e.id}`)
    }

    render() {
        return (
            <div >
                <Divider>
                    <Title level={4} style={{ textAlign: 'center', marginTop: 10 }}>Chapters</Title>
                </Divider>

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
                        const { order, chapter_photo, title, text } = item;
                        let textToShow = '';
                        if (text !== null) {
                            textToShow = text.substring(0, 150);
                        }
                        let imgToShow = './images/placeholder.png';
                        if (chapter_photo !== null) {
                            imgToShow = chapter_photo;
                        }
                        return (
                            <List.Item
                                key={title} type="flex" align="top" className="chapter-contents"
                                extra={<img width={100} alt={`for chapter ${order}`} src={imgToShow} />}
                            >
                                <List.Item.Meta
                                    title={<Link to={`${this.props.match.url}/chapter/${order}`}>{title}</Link>}
                                    description={textToShow}
                                />
                                <Row type="flex" justify="end"><Button onClick={() => this.readChapter(item)}>Read Chapter</Button></Row>

                            </List.Item>
                        )
                    }}
                />
            </div>
        )
    }
};

const SummaryChapterListWithRouter = withRouter(SummaryChapterList);

export default connect()(SummaryChapterListWithRouter);