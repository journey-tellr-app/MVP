import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContributorItem extends Component {
    render() {
        return (
            <div>
                <h1>Contributor Item</h1>
            </div>
        )
    }
};

export default connect()(ContributorItem);