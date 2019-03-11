import React, { Component } from 'react';
// import axios from 'axios';  //uncomment out when actually sending

class ImageUpload extends Component {
    constructor() {
        super();
        this.state = {
            file: null
        };
    }

    submitFile = (event) => {  //this was the default function given with AWS
        event.preventDefault();
        console.log(this.state.file);
        
        // const formData = new FormData();
        // formData.append('file', this.state.file[0]);
        // return <img src={event}></img>
        // axios.post(`/test-upload`, formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then(response => {
        //     // handle your response;
        // }).catch(error => {
        //     // handle your error
        // });
    }
    appendPic = () => {

        return <img height="50" width="50" src={this.state.file} alt="thumbnail chosen"/>
    }
    handleFileUpload = (event) => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])  //static method creates a DOMString containing a URL representing the object given in the parameter.
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