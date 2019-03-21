import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { List, Button, Row } from 'antd';

class SummaryChapterList extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    handleDescription = (e) => {
        if (e.length < 200) {
            return e
        } else {
            return `${e.substring(0, 200)}...`
        }
    }
    readChapter = (e) => {
        this.props.history.push(`/existing-story/${e.story_id}/chapter/${e.id}`)
    }
    render() {
        // console.log(this.props);
        // console.log(`/#${this.props.match.url}/chapter/${this.props.chapter.order}`)
        return (
            <div >
                <h1>Chapters</h1>
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
                        return (
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
                        )
                    }}
                />
            </div>
        )
    }
};

const SummaryChapterListWithRouter = withRouter(SummaryChapterList);

export default connect()(SummaryChapterListWithRouter);