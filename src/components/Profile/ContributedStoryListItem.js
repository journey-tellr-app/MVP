import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContributedStoryListItem extends Component {

    handleReadStory = (event) => {
        console.log('in handleRead');
    }

    render() {

        return (
            <div>
                <h3>{this.props.title}</h3>
                <img width='150px'
                    height='100px'
                    src={this.props.header_photo} />
                <h4>{this.props.author}</h4>
                {this.props.profile_pic}
                <button onClick={this.handleReadStory}>Read</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(ContributedStoryListItem);