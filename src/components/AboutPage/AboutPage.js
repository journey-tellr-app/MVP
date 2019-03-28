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
      <div className="about">
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Avatar shape="square" size={128} src='/images/kevinslogos/JourneyTellr-color.png' id="app-photo" />
          </Col>
          <Col span={8}></Col>
        </Row>
        <Row type="flex" justify="space-around" align="bottom">
          <Col span={12} >
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
