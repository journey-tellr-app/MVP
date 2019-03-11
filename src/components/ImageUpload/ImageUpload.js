import React, { Component } from 'react';
import axios from 'axios';

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
        console.log(formData);
        axios.post(`/awsS3`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // handle your response;
            console.log(response);

        }).catch(error => {
            console.log(error);

            // handle your error
        });
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

export default ImageUpload;