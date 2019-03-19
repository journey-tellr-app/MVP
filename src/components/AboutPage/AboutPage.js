import React, { Component } from 'react';
import { Avatar } from 'antd';
import { Row, Col } from 'antd';
import { Card } from 'antd';
import { Typography } from 'antd';
import './AboutPage.css';

const { Paragraph } = Typography;

class AboutPage extends Component {


  render() {

    return (
      <div>
        <div>
          <button onClick={this.addFakePeople}>Add 300 people to the database</button><br />
          <button onClick={this.addFakeStories}>Add 30 stories to the database</button>  {/*Need to send props so component knows where to send and store */}
        </div>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Avatar shape="square" size={128} icon="user" className="app-photo" />
          </Col>
          <Col span={8}></Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>
            <Card className="paragraph">
              <Paragraph>
                JourneyTellr is a social media app for enterprise-level
                organizations to use internally with their employees.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

}
export default AboutPage;
