import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { List } from 'antd';

class TemplateChapter extends Component {
    render() {
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.chapter}
                    renderItem={(item, i) => (
                        <List.Item>
                            <List.Item.Meta
                                title={<p>Chapter - {i + 1}</p>}
                            />
                            <div>{item.title}</div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
};

export default connect()(TemplateChapter);