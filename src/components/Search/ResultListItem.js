import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { List, Icon, Avatar, Card, Row, Col } from 'antd';

class ResultListItem extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

  render() {
      const { item } = this.props;
      const { Meta } = Card;
      const { ReadMore } = "... Read More"
    console.log(item.intro.substring(0, 40));
    return (
      <Row Row type="flex" align="bottom">
        <Col span={12}>            
        <List.Item
        >
          <List.Item.Meta
            title={item.title}
            description={item.intro.substring(0, 100)}
          />
          {item.content}
        </List.Item>
          <List.Item
            type="flex" justify="center" align="bottom"
            key={item.title}
            actions={[<Icon type="star-o" text={item.likes} />, <Icon type="like-o" text="156" />, <Icon type="message" text="2" />]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.profile_pic} />}
              description={item.full_name}
              
            />
          </List.Item>
        </Col>
        <Col span={12}><Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={item.header_photo} />}
        >
          <Meta
            description={item.caption}
          />
        </Card></Col>
      </Row>

    )
  }
}

export default withRouter(ResultListItem);
