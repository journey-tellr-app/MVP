import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import { Icon } from 'antd';
import { Typography } from 'antd';
import { Divider } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import './ProfilePage.css';
import 'antd/dist/antd.css';
import moment from 'moment'

import ImageUpload from './../ImageUpload/ImageUpload';
import ContributedStoryList from './ContributedStoryList';
// import ImageUpload from '../ImageUpload/ImageUpload';
// const axios = require('axios');

const { Title } = Typography;
const { Text } = Typography;



class ProfilePage extends Component {
    state =
        {
            isHidden: true,
            id: this.props.user.userInfo.id,
            first_name: this.props.user.userInfo.first_name,
            last_name: this.props.user.userInfo.last_name
        };


    onEditBtnClick() {
        this.setState(state => ({
            isHidden: !state.isHidden
        }));
    }

    handleChange = propertyName => event => {
        this.setState({ [propertyName]: event.target.value });
    }

    submitEditedName() {
        const editedName = { id: this.state.id, first_name: this.state.first_name, last_name: this.state.last_name }
        console.log(editedName);
        this.props.dispatch({ type: 'EDIT_PROFILE', payload: editedName });
        this.setState(state => ({
            isHidden: !state.isHidden
        }));
    }





    render() {

        return (



            <div>


                {JSON.stringify(this.props.story.userStoryReducer)}
                <Row>
                    {JSON.stringify(this.props.user.userInfo)}
                    <Col span={6}><img className="profile-element" src={this.props.user.userInfo.profile_pic} height="75" /></Col>
        
                    <Col span={10}>
                       
                        {this.state.isHidden ? this.renderStaticText() : this.renderEditField()}

                    </Col>
                </Row>
                <Row>
                    <Col span={6}><ImageUpload typeOfPhoto='PERSON' /></Col>
                    <Col span={10}></Col>
                    <Col span={6}></Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}><Icon type="calendar" style={{ fontSize: '16px' }} /></Col>
                    <Col span={16}><Text>Member since</Text>&nbsp;{moment(this.props.user.userInfo.date_created).format("MMM Do, YYYY")};</Col>
                </Row>
                <Row>
                    <Col span={8}><Icon type="book" style={{ fontSize: '16px' }} /></Col>
                    <Col span={16}>{this.props.story.userStoryReducer.length}&nbsp;Stories</Col>
                </Row>
                <Row>
                    <Col span={8}><Icon type="profile" style={{ fontSize: '16px' }} /></Col>
                    <Col span={16}>{this.props.story.contributedStoryReducer.length}&nbsp;Contributions</Col>
                </Row>
                <Row>
                    <Col span={8}><Title level={4}>Stories</Title></Col>
                    <Col span={16}></Col>
                </Row>
                <Row>
                    <Col span={24}><ContributedStoryList /></Col>
                </Row>
            </div>
        )
    }
    renderEditField() {
        return (
            <Col span={16}>
                <Input className="profile-element" onChange={this.handleChange('first_name')} placeholder={this.props.user.userInfo.first_name} />
                <Input className="profile-element" onChange={this.handleChange('last_name')} placeholder={this.props.user.userInfo.last_name} />
                <Button className="profile-element" onClick={this.submitEditedName.bind(this)}>Save</Button>
            </Col>
        )
    }
    renderStaticText() {
        return (
            <Col span={16}>
                <Title className="profile-element" level={4}>{this.props.user.userInfo.first_name}&nbsp;{this.props.user.userInfo.last_name}</Title>
                <Button className="profile-element" icon="edit" onClick={this.onEditBtnClick.bind(this)} />
            </Col>

        )
    }

}
const mapStoreToProps = reduxStore => ({
    user: reduxStore.user,
    story: reduxStore.story,
});

export default connect(mapStoreToProps)(ProfilePage);
