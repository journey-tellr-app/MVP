import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchResult extends Component {
    render() {
        return (
            <div>
                <h1>Search Results</h1>
            </div>
        )
    }
};

export default connect()(SearchResult);