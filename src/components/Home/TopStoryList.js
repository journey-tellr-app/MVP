import React, { Component } from 'react';
import TopStoryItem from './TopStoryItem';

import { connect } from 'react-redux';

class TopStoryList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_STORIES' });
    }

    render() {
        return (
            <div className='top-stories'>
                {/* {JSON.stringify(this.props.state.story.topStoriesReducer)} */}
                <h3>Top Stories</h3>
                {/* this div contains the individual top stories */}
                <div>
                    {this.props.state.story.topStoriesReducer.map( (story, i) => {
                        return <TopStoryItem 
                                    key={i}
                                    header_photo={story.header_photo}
                                    title={story.title}
                                    intro={story.intro} />
                    })}
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(TopStoryList);