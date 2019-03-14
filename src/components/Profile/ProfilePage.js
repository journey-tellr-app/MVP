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

import ContributedStoryList from './ContributedStoryList';
// import ImageUpload from '../ImageUpload/ImageUpload';
// const axios = require('axios');

const { Title } = Typography;
const { Text } = Typography;



class ProfilePage extends Component {
    state =
        {
            isHidden: true,
            first_name: 'First name',
            last_name: 'Last name'
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
        this.props.dispatch({ type: 'EDIT_PROFILE', payload: this.state });
        this.setState(state => ({
            isHidden: !state.isHidden
        }));
    }





    render() {

        return (



            <div>



                <Row>
                    <Col span={6}><img className="profile-element" src={this.props.reduxStore.user.profile_pic} height="75" /></Col>
                    <Col span={10}>
                        {/*  */}
                        {this.state.isHidden ? this.renderStaticText() : this.renderEditField()}

                    </Col>
                </Row>
                <Row>
                    <Col span={6}><Button className="edit-btn">Edit</Button></Col>
                    <Col span={10}></Col>
                    <Col span={6}></Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}><Icon type="calendar" style={{ fontSize: '16px' }} /></Col>
                    <Col span={16}><Text>Member since</Text>&nbsp;{moment(this.props.reduxStore.user.date_created).format("MMM Do, YYYY")};</Col>
                </Row>
                <Row>
                    <Col span={8}><Icon type="book" style={{ fontSize: '16px' }} /></Col>
                    <Col span={16}>{this.props.reduxStore.story.contributedStoryReducer.length}&nbsp;Stories</Col>
                </Row>
                <Row>
                    <Col span={8}><Icon type="profile" style={{ fontSize: '16px' }} /></Col>
                    <Col span={16}>[Number] Contributions</Col>
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
                <Input className="profile-element" onChange={this.handleChange('first_name')} placeholder={this.props.reduxStore.user.first_name} />
                <Input className="profile-element" onChange={this.handleChange('last_name')} placeholder={this.props.reduxStore.user.last_name} />
                <Button className="profile-element" onClick={this.submitEditedName.bind(this)}>Submit</Button>
            </Col>
        )
    }
    renderStaticText() {
        return (
            <Col span={16}>
                <Title className="profile-element" level={4}>{this.props.reduxStore.user.first_name}&nbsp;{this.props.reduxStore.user.last_name}</Title>
                <Button className="profile-element" icon="edit" onClick={this.onEditBtnClick.bind(this)} />
            </Col>

        )
    }

}
const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(ProfilePage);
