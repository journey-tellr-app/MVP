import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal, Button, Row, Avatar, Input, Col } from 'antd';

import './ImageUpload.css';

class ImageUpload extends Component {
    state = {
        visible: false,
        file: null,
        confirmLoading: false,
    }

    //photo details contains title for button name and typeOfPhoto keywords for next saga
    static propTypes = {
        photoDetails: PropTypes.object.isRequired,
        editMode: PropTypes.bool,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.submitFile();
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                file: null,
                confirmLoading: false,
            });
        }, 2000);
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
            nextType: `ADD_IMAGE_${this.props.photoDetails.typeOfPhoto}`,
            payload: formData,
            id: this.props.user.userInfo.id,
            chapterId: this.props.photoDetails.chapterId,
            storyId: this.props.photoDetails.storyId,
        }
        this.props.dispatch(action);
        // console.log(this.props.photoDetails.typeOfPhoto);
    }

    handleFileUpload = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    render() {
        const { buttonName, title } = this.props.photoDetails;
        const { visible, confirmLoading, file } = this.state;
        // determines button class based on whether its used on for story editing
        let buttonClass;
        if (this.props.editMode) {
            buttonClass = 'edit-button';
        }
        let thumbnailSrc = file;
        if (this.state.file !== null) {
            thumbnailSrc = URL.createObjectURL(file);
        }
        return (
            <div>
                   <Button 
                    type="default" 
                    onClick={this.showModal} 
                    className={buttonClass}
                    style={{width: '100%'}}>
                    {buttonName}
                </Button> 
                <Modal
                    title={title}
                    style={{ top: 20 }}
                    visible={visible}
                    onOk={this.handleOk}
                    okText='Save Photo'
                    onCancel={this.handleCancel}
                    confirmLoading={confirmLoading}
                >
                    {/* <div>Take A Photo: <input label='upload file' type='file' accept="image/*" capture="camera" onChange={this.handleFileUpload} /></div> This is being commented out for the sake of the presentation since it is useless on browser */}
                    {/* <h2>OR</h2> */}
                    <Row type="flex" justify="center">
                        <Col>
                            <Input type="file" accept="image/*" onChange={this.handleFileUpload} />
                        </Col>
                        <Col style={{marginTop: 10}}>
                            <Avatar shape="square" size={100} icon="picture" src={thumbnailSrc} />
                        </Col>
                    </Row>
                </Modal>

            </div>
        );
    }
}
const mapStoreToProps = reduxStore => ({
    user: reduxStore.user,
})
export default connect(mapStoreToProps)(ImageUpload)