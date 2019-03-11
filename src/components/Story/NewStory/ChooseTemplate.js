import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChooseTemplate extends Component {
    render() {
        return (
            <div>
                <h1>Choose Template</h1>
            </div>
        )
    }
};

export default connect()(ChooseTemplate);