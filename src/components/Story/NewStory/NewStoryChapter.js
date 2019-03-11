import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewStoryChapter extends Component {
    render() {
        return (
            <div>
                <h1>New Story Chapter</h1>
            </div>
        )
    }
};

export default connect()(NewStoryChapter);