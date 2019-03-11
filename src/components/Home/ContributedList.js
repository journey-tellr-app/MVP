import React, { Component } from 'react';
import { connect } from 'react-redux';

class ContributedList extends Component {

    componentDidMount = () => {

        // return this.props.state.user.id !== undefined ? this.props.dispatch({
        //     type: 'GET_MY_CONTRIBUTIONS',
        //     payload: this.props.state.user.id
        // }) : null

        this.props.dispatch({type: 'GET_MY_CONTRIBUTIONS'});

    }
        
    
    render() {


        return (
            <div>
                {JSON.stringify(this.props.state.story.storyReducer)}
                <div className='contributions'>
                    <h4>Contribution List</h4>
                    <h4>___Stories live</h4>
                    
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(ContributedList);