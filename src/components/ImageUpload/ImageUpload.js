import { Modal, Button, Row } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



class ImageUpload extends Component {
    state = {
        visible: false,
        file: null
    }

    //photo details contains title for button name and typeOfPhoto keywords for next saga
    static propTypes = {
        photoDetails: PropTypes.object.isRequired,
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
        console.log(`This props:`, this.props);
        // event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        const action = {
            type: 'ADD_IMAGE_AWS',  //directs dispach on which saga to use based on props
            nextType: `ADD_IMAGE_${this.props.photoDetails.typeOfPhoto}`,
            payload: formData,
            id: this.props.user.userInfo.id,
            chapterId: this.props.photoDetails.chapterId,
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

    render() {
        return (
            <div>
                
                <Button type="default" onClick={this.showModal}>
                    {this.props.photoDetails.title}
                </Button>
                <Modal
                    title={this.props.photoDetails.title}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/* <div>Take A Photo: <input label='upload file' type='file' accept="image/*" capture="camera" onChange={this.handleFileUpload} /></div> This is being commented out for the sake of the presentation since it is useless on browser */}
                    {/* <h2>OR</h2> */}
                    <Row type="flex" justify="center">
                        <div>Choose Photo From Library:</div>
                        <input type="file" accept="image/*" onChange={this.handleFileUpload}></input>
                        {this.state.file !== null && this.appendPic()}
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