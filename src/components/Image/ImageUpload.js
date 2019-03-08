import React, { Component } from 'react';
import { connect } from 'react-redux';

class ImageUpload extends Component {
    render() {
        return (
            <div>
                <h1>Image Upload</h1>
            </div>
        )
    }
};

export default connect()(ImageUpload);