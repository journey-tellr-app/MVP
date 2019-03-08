import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditChapterPage extends Component {
    render() {
        return (
            <div>
                <h1>Edit Chapter Page</h1>
            </div>
        )
    }
};

export default connect()(EditChapterPage);