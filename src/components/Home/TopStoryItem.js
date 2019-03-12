import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopStoryItem extends Component {

    handleReadStory = (event) => {
        console.log('in readStory');
    }
    
    render() {

        return (
            <div>
                {this.props.title}
                <img 
                    width='150px' 
                    height='100px' 
                    src={this.props.header_photo} />
                <h3>Started by {this.props.name}</h3>
                <img width='150px' 
                     height='100px'
                     src={this.props.profile_pic} />
                <button onClick={this.handleReadStory}>Read</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(TopStoryItem);