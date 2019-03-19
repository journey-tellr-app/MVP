import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Icon, Typography, Divider, Button, Input, Modal } from 'antd';

import './ProfilePage.css';
import 'antd/dist/antd.css';
import moment from 'moment'

import ContributedStoryList from './ContributedStoryList';


const { Title } = Typography;
const { Text } = Typography;
const { TextArea } = Input;



// this component displays the user's profile information and stories
class ProfilePage extends Component {
    state =
        {
            isHidden: true,
            id: this.props.user.userInfo.id,
            first_name: this.props.user.userInfo.first_name,
            last_name: this.props.user.userInfo.last_name,
            bio: this.props.user.userInfo.bio,
            visible: false,
            file: null
        };

    // functions for image upload   
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.submitFile();
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    submitFile = (event) => {
        // console.log('in sF');

        // event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        const action = {
            type: 'ADD_IMAGE_AWS',  //directs dispach on which saga to use based on props
            nextType: `ADD_IMAGE_${'PERSON'}`,
            payload: formData,
            id: this.props.user.userInfo.id
        }
        this.props.dispatch(action);
        // console.log(this.props.photoDetails.typeOfPhoto);

    }
    appendPic = () => {
        let statePic = this.state.file
        let picURL = URL.createObjectURL(statePic)
        return <img height="100" width="100" src={picURL} alt="thumbnail chosen" />
    }
    handleFileUpload = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    // functions for editing input fields
    onEditBtnClick() {
        this.setState(state => ({
            isHidden: !state.isHidden
        }));
    }

    handleChange = propertyName => event => {
        this.setState({ [propertyName]: event.target.value });
    }

    submitEditedName() {
        const editedName = { id: this.state.id, first_name: this.state.first_name, last_name: this.state.last_name, bio: this.state.bio }
        console.log(editedName);
        this.props.dispatch({ type: 'EDIT_PROFILE', payload: editedName });
        this.setState(state => ({
            isHidden: !state.isHidden
        }));
    }




    testThings = () => {
        console.log(this.props.reduxStore.user);

    }

    render() {

        return (

            <div className="container">
                <Row gutter={16}>
                    {/* {JSON.stringify(this.props.user.userInfo)} */}
                    <Col xs={6}><img onClick={this.showModal} id="avatar" className="profile-element" src={this.props.user.userInfo.profile_pic} height="75" alt="profile-pic" /></Col>

                    {this.state.isHidden ? this.renderStaticName() : this.renderEditName()}

                </Row>
                <Row gutter={16}>
                    <Col xs={6}><Button className="profile-element" id="edit-btn" onClick={this.onEditBtnClick.bind(this)}>Edit Profile</Button>
                    </Col>
                    <Col xs={18}></Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={6}></Col>
                    <Col xs={18}>
                        <Icon className="profile-element" type="calendar" style={{ fontSize: "12px" }} /><Text className="stats-text">Member since&nbsp;{moment(this.props.user.userInfo.date_created).format("MMM Do, YYYY")}</Text>;
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={6}></Col>
                    <Col xs={18}>
                        <Icon className="profile-element" type="book" style={{ fontSize: "12px" }} /><Text className="stats-text">{this.props.story.userStoryReducer.length}&nbsp;Stories</Text>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={6}></Col>
                    <Col xs={16}>
                        <Icon className="profile-element" type="profile" style={{ fontSize: "12px" }} /><Text className="stats-text">{this.props.story.contributedStoryReducer.length}&nbsp;Contributions</Text>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                    <Col xs={8}><Title level={4}>Stories</Title></Col>
                    <Col xs={18}></Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24}>{this.props.story ?
                        (<ContributedStoryList />) : (<p>loading...</p>)}</Col>
                </Row>
                {/* this code is for the conditionally rendered modal, which only
                appears when the profile picture is clicked on */}
                <div>
                    <Modal
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Row type="flex" justify="center">
                            <div>Choose Photo From Library:</div>
                            <input type="file" accept="image/*" onChange={this.handleFileUpload}></input>
                            {this.state.file !== null && this.appendPic()}
                        </Row>
                    </Modal>
                </div>
            </div >

        )
    }
    // conditionally rendered fields, rendered according to whether or not the edit button has been clicked
    // edit field to change user's first and last name; static text transforms into two text fields
    renderEditName() {
        return (
            <Col xs={12}>
                <Input className="edit-input" size="small" onChange={this.handleChange('first_name')} placeholder='first name' />
                <Input className="edit-input" size="small" onChange={this.handleChange('last_name')} placeholder='last name' />
                <TextArea className="edit-input" onChange={this.handleChange('bio')} placeholder="enter a short bio" />
                <Button className="edit-element" id="edit-btn" onClick={this.onEditBtnClick.bind(this)}>Cancel</Button>
                <Button className="edit-element" id="edit-btn" onClick={this.submitEditedName.bind(this)}>Save</Button>
            </Col>
        )
    }
    // field that displays first, last name, and bio
    renderStaticName() {
        return (
            <div>
                <Col xs={16}>
                    <Title id="user-name" level={4}>{this.props.user.userInfo.first_name}&nbsp;{this.props.user.userInfo.last_name}</Title>
                    <Text className="text">{this.props.user.userInfo.bio}</Text>
                </Col>
                {/* <Col xs={4}>
                </Col> */}
            </div>


        )
    }


}


const mapStoreToProps = reduxStore => ({
    user: reduxStore.user,
    story: reduxStore.story,
});

export default connect(mapStoreToProps)(ProfilePage);
