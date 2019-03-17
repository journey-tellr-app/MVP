import React, { Component } from 'react';
// import { connect } from 'react-redux';

class TopStoryItem extends Component {

    handleReadStory = (event) => {
        this.props.history.push(`/existing-story/${this.props.id}`);
    }
    
    render() {
        const {header_photo, profile_pic, name} = this.props;
        return (
            <div>
                <img 
                    width='150px' 
                    height='100px' 
                    src={this.props.header_photo} 
                    alt={`${header_photo}`}/>
                <h3>Started by {name}</h3>
                <img width='150px' 
                     height='100px'
                     src={profile_pic}
                     alt={`Headshot of the author ${name}`} />
                <button onClick={this.handleReadStory}>Read</button>
            </div>
        )
    }
};

// const mapStateToProps = (state) => ({
//     state
// });

// export default connect(mapStateToProps)(TopStoryItem);
export default TopStoryItem;