import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChapterView extends Component {
    render() {
        return (
            <div>
                <h1>Chapter View</h1>
            </div>
        )
    }
};

export default connect()(ChapterView);