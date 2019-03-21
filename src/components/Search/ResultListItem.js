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

    handleClick = () => {
      this.props.history.push(`/existing-story/${this.props.item.story_id}`);
    }
    handleDescription = () => {
      if (this.props.item.intro.length < 100) {
        return this.props.item.intro.substring(0, 100)
      } else if (this.props.item.intro.length){
        return `${this.props.item.intro.substring(0, 100)}...`
      }
    }

  render() {
      const { item } = this.props;
      const { Meta } = Card;

    // console.log(item.intro.substring(0, 40));
    return (
      <Row type="flex" align="middle" className='search-story'>
        <Col span={12}>            
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={this.handleDescription()}
            align="top"
            
          />
          {item.content}
          </List.Item> {/*end first item */}
          <List.Item
            key={item.title}
            actions={<Icon type="like" text="156" />}
          >
            <List.Item.Meta
            className="list-content"
              avatar={<Avatar src={item.profile_pic} />}
              description={item.full_name}
            />
          </List.Item>
        </Col>
        <Col span={12}>
          <Card
            onClick={this.handleClick}
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={item.header_photo} />}
          >
            <Meta
              description={item.caption}
            />
          </Card>
        </Col>
      </Row>
    )
  }
}

export default withRouter(ResultListItem);
