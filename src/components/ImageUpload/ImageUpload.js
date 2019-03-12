import React, { Component } from 'react';
// import axios from 'axios';
import {connect} from 'react-redux'

class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
    }

    submitFile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        const action = {
            type: `ADD_IMAGE_${this.props.typeOfPhoto}`,  //directs dispach on which saga to use based on props
            payload: formData,
            id: this.props.user.id
        }
        this.props.dispatch(action);
        console.log(this.props.typeOfPhoto);
        
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

const mapStoreToProps = reduxStore => ({
    user: reduxStore.user,
})

export default connect(mapStoreToProps) (ImageUpload);