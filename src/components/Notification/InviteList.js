import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, Avatar, Icon } from 'antd';

class InviteList extends Component {

    buildListItems = (item) => {
        return <List.Item>
            <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">title</a>}
                description={item.status}
            />
        </List.Item>
    }

    render() {
        const { invite } = this.props;
        return (
            <List
                itemLayout="vertical"
                dataSource={invite}
                renderItem={invite => (
                    <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">title</a>}
                                description={invite.status}
                            />
                    </List.Item>
                )}
                
                />

        )
    }
};

export default connect()(InviteList);