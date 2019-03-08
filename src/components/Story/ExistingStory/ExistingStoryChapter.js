import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExistingStoryChapter extends Component {
    render() {
        return (
            <div>
                <h1>ExistingStoryChapter</h1>
            </div>
        )
    }
};

export default connect()(ExistingStoryChapter);