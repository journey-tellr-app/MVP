import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContributedListItem extends Component {
    
    render() {

        return (
            <div>
               <h3>{this.props.title}</h3>
               <img width='150px' height='100px' src={this.props.header_photo} />
               <h4>{this.props.author}</h4>
               {this.props.profile_pic}
               <button>Read</button>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(ContributedListItem);