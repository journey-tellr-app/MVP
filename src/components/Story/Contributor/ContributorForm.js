import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContributorForm extends Component {
    render() {
        return (
            <div>
                <h1>Contributor Form</h1>
            </div>
        )
    }
};

export default connect()(ContributorForm);