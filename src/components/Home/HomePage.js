import React, { Component } from 'react';
import { connect } from 'react-redux';


import ContributedList from './ContributedList';
import TopStoryList from './TopStoryList';

class HomePage extends Component {
    
    render() {
        return (
            <div>
                <h1 align='center'>Home page</h1>
                <ContributedList
                    history={this.props.history}
                />
                <TopStoryList
                    history={this.props.history}
                />
            </div>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(mapStateToProps)(HomePage);