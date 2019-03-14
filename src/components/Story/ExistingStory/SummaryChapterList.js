import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

import { List } from 'antd';

class SummaryChapterList extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        console.log(this.props.match);
        console.log(`/#${this.props.match.url}/chapter/${this.props.chapter.order}`)
        return (
            <div>
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
                        const { order, chapter_photo, text, title } = item;
                        return (
                            <List.Item
                                key={title}
                                extra={<img width={100} alt={`User photo for chapter ${order}`} src={`${chapter_photo}`} />}
                            >
                                <List.Item.Meta
                                    title={<Link to={`${this.props.match.url}/chapter/${order}`}>{title}</Link>}
                                    description={text}
                                />
                                {item.content}
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