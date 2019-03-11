import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            file: null
        };
    }

    submitFile = (event) => {
        event.preventDefault();  //if the event does not get explicitly handled, its default action should not be taken as it normally would be
        const formData = new FormData();  //provides a way to easily construct a set of key/value pairs representing form fields and their values
        formData.append('file', this.state.file[0]);  //appends filename to DOM
        axios.post(`/awsS3`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // handle your response;
        }).catch(error => {
            // handle your error
        });
    }

    handleFileUpload = (event) => {
        this.setState({ file: event.target.files });
    }

    render() {
        return (
            <form onSubmit={this.submitFile}>
                <input label='upload file' type='file' onChange={this.handleFileUpload} />
                <button type='submit'>Send</button>
            </form>
        );
    }
}

export default FileUpload;