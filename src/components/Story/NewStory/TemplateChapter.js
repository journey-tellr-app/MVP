import React, { Component } from 'react';
import { connect } from 'react-redux';

// ant design import
import { Form, Input, Icon, Button, List } from 'antd';

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
                {/* {this.props.chapter.map((item, i) => (
                    <p key={i}>Chapter:{i + 1} - {item.title}</p>
                ))} */}
            </div>
        )
    }
};

export default connect()(TemplateChapter);