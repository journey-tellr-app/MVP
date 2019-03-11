import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorForm from './ContributorForm';

class ContributorPopup extends Component {
    render() {
        return (
            <div>
                <h1>Contributor Popup</h1>
                <button> Popup Form </button>
                <ContributorForm/>
            </div>
        )
    }
};

export default connect()(ContributorPopup);