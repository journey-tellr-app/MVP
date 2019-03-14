import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List } from 'antd';

class ExistingStoryChapter extends Component {

    render() {

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
                                    title={<a href={item.href}>{title}</a>}
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

export default connect()(ExistingStoryChapter);