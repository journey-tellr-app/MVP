import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import {List, Icon, Avatar } from 'antd';

class ResultListItem extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

  render() {
      const { item } = this.props;
      console.log(item);
    return (
      <div>
            <List.Item
                key={item.title}
                actions={[<Icon type="star-o" text={item.likes} />, <Icon type="like-o" text="156" />, <Icon type="message" text="2" />]}
                extra={<img width={272} alt="logo" src={item.header_photo} />}
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.profile_pic} />}
            title={<a href={`http://localhost:3000/#/existing-story/${item.story_id}`}>{item.title}</a>}
                    description={item.description}
                />
                {item.content}
                </List.Item>
      </div>
    )
  }
}

export default withRouter(ResultListItem);
