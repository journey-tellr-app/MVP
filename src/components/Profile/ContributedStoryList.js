import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContributedStoryList extends Component {
    render() {
        return (
            <div>
                <h1>Contributed Story List</h1>
            </div>
        )
    }
};

export default connect()(ContributedStoryList);