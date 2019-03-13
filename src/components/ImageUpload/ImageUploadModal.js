import { Modal, Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';



class ImageUpload extends React.Component {
    state = {   visible: false,
                file: null
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
        console.log('in sF');

        // event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        const action = {
            type: 'ADD_IMAGE_AWS',  //directs dispach on which saga to use based on props
            nextType: `ADD_IMAGE_${this.props.typeOfPhoto}`,
            payload: formData,
            id: this.props.user.id
        }
        this.props.dispatch(action);
        console.log(this.props.typeOfPhoto);

    }
    appendPic = () => {
        let statePic = this.state.file
        let picURL = URL.createObjectURL(statePic)
        return <img height="50" width="50" src={picURL} alt="thumbnail chosen" />
    }
    handleFileUpload = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open Modal
        </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>Take A Photo: <input label='upload file' type='file' accept="image/*" capture="camera" onChange={this.handleFileUpload} /></div>
                    <h2>OR</h2>
                    <div>Choose Photo From Library: <input type="file" accept="image/*" onChange={this.handleFileUpload}></input></div>
                    {this.state.file !== null && this.appendPic()}
                </Modal>
            </div>
        );
    }
}
const mapStoreToProps = reduxStore => ({
    user: reduxStore.user,
})
export default connect(mapStoreToProps) (ImageUpload)