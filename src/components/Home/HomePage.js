import React, { Component } from 'react';
import { connect } from 'react-redux';
//Ant design
import { Divider } from 'antd';

import ContributedList from './ContributedList';
import TopStoryList from './TopStoryList';

class HomePage extends Component {
    
    render() {
        return (
            <div>
                <br/>
                <h1 align='center'>Home</h1>
                <Divider>My Stories and Contributions</Divider>
                <ContributedList
                    history={this.props.history}
                />
                <Divider>Top Stories at Prime</Divider>
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