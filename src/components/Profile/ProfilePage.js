import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import { Typography } from 'antd';
import { Divider } from 'antd';
import { Button } from 'antd';
import './ProfilePage.css';
import 'antd/dist/antd.css';

// import ImageUpload from '../ImageUpload/ImageUpload';
// const axios = require('axios');

const { Title } = Typography;
const { Text } = Typography;



class ProfilePage extends Component {





    render() {

        return (
            <div>

               

                <Row>
                    <Col span={6}><img className="profile-element" src={this.props.reduxStore.user.profile_pic} height="75" /></Col>
                    <Col span={10}><Title className="profile-element" level={4}>{this.props.reduxStore.user.first_name}&nbsp;{this.props.reduxStore.user.last_name}</Title></Col>
                    <Col span={6}><Button className="profile-element" icon="edit" /></Col>
                </Row>
                <Row>
                    <Col span={6}><Button className="edit-btn">Edit</Button></Col>
                    <Col span={10}></Col>
                    <Col span={6}></Col>
                </Row>
                <Divider />

            </div>
        )
    }

}
const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(ProfilePage);
// //posts to fakes.router.js
// addFakePeople = (event) => {
//     axios.post('/fakes');
// }

// //posts to fakes.router.js
// addFakeStories = (event) => {
//     axios.post('/fakes/story');
// }

{/* <div>
                    <button onClick={this.addFakePeople}>Add 300 people to the database</button><br />
                    <button onClick={this.addFakeStories}>Add 30 stories to the database</button>
                    <ImageUpload />
                </div> */}
