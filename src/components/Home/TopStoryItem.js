import React, { Component } from 'react';
import { connect } from 'react-redux';

class TopStoryItem extends Component {
    
    render() {

        return (
            <div>
                <img 
                    width='150px' 
                    height='100px' 
                    src={this.props.header_photo} />
                {this.props.title}
                <h3>Started by {this.props.name}</h3>
                <img width='150px' 
                     height='100px'
                     src={this.props.profile_pic} />
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(TopStoryItem);