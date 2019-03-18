import React, { Component } from 'react';
import TopStoryItem from './TopStoryItem';
import './TopStoryList.css';

import propTypes from 'prop-types';
import { connect } from 'react-redux';

class TopStoryList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_TOP_STORIES' });
    }

    render() {
        return (
            <div>
                <h3>Top Stories</h3>
                {/* this div contains the individual top stories */}
                <div className='top-stories'>
                    {this.props.topStories.map((story, i) => {
                        return (
                            <div className='row'>
                                <TopStoryItem
                                    id={story.story_id}
                                    history={this.props.history}
                                    key={i}
                                    header_photo={story.header_photo}
                                    title={story.title}
                                    intro={story.intro}
                                    name={story.first_name + ' ' + story.last_name}
                                    profile_pic={this.profile_pic} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    topStories: state.story.topStoriesReducer
});

export default connect(mapStateToProps)(TopStoryList);