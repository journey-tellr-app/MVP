import React, { Component } from 'react';
import TopStoryItem from './TopStoryItem';

// import Slider from 'react-slick';
import { Carousel } from 'antd';
import { connect } from 'react-redux';

class TopStoryList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_TOP_STORIES' });
    }

    render() {

        return (
            <div className='top-stories'>
                {/* <h3 align='center'>Top Stories at Prime</h3> */}
                {/* this div contains the individual top stories */}
                <Carousel swipeToSlide>
                    {this.props.topStories.map((story, i) => {
                        return <TopStoryItem
                            user_id={this.props.userInfo.id}
                            story_id={story.story_id}
                            history={this.props.history}
                            key={i}
                            header_photo={story.header_photo}
                            title={story.title}
                            intro={story.intro}
                            author={story.first_name + ' ' + story.last_name}
                            profile_pic={story.profile_pic}
                            likes={story.likes} />

                    })}
                </Carousel>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo,
    topStories: state.story.topStoriesReducer
});

export default connect(mapStateToProps)(TopStoryList);