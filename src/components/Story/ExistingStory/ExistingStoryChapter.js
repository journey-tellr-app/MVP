import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExistingStoryChapter extends Component {
    componentDidMount(){ //bring in photo here

    }
    render() {
        return (
            <div>
                <h1>ExistingStoryChapter</h1>
                <div>
                    <h1>Title: {this.props.chap.title}</h1> {/*Title: to be deleted after routes are created */}
                </div>
                <div>
                    <h1>Photo: <img src={this.props.} width="100%" height="75" alt="depicts chapter activity" /></h1> {/*Slightly smaller than story pic? */}
                    <h3>Caption: {this.props.chap.text} </h3>
                </div>
            </div>
        )
    }
};

export default connect()(ExistingStoryChapter);