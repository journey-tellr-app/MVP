import React, { Component } from 'react';
// import axios from 'axios';
import {connect} from 'react-redux'

class ImageUpload extends Component {
    constructor() {
        super();
        this.state = {
            file: null
        };
    }

    submitFile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        const action = {
            type: 'ADD_IMAGE',
            payload: formData,
        }
        this.props.dispatch(action);
    }
    appendPic = () => {
        let statePic = this.state.file
        let picURL = URL.createObjectURL(statePic)
        return <img height="50" width="50" src={picURL} alt="thumbnail chosen"/>
    }
    handleFileUpload = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitFile}>
                    <div>Take photo: <input label='upload file' type='file' accept="image/*" capture="camera" onChange={this.handleFileUpload} /></div>
                    <div>Choose Photo: <input type="file" accept="image/*" onChange={this.handleFileUpload}></input></div>
                    {this.state.file !== null && this.appendPic()}
                    <button type='submit'>Send</button>
                </form>
            </div>


        );
    }
}

export default connect() (ImageUpload);