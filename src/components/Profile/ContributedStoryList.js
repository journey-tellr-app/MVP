import React, { Component } from 'react';
import ContributedStoryListItem from './ContributedStoryListItem';

import { Carousel } from 'antd';


import { connect } from 'react-redux';

class ContributedStoryList extends Component {

    componentDidMount = () => {
        this.handleDispatch();
    }

    handleDispatch = () => {
        //the first dispatch gets the stories user is contributing to and renders them on
        //the profile page
        this.props.dispatch({ type: 'GET_MY_CONTRIBUTIONS' });
        //this dispatches for each story's likes
    }

    render() {

        return (
            <div className='contributions'>
                <div>

                    {/* {JSON.stringify(this.props.storyDetail.likes)} */}
                    <Carousel swipeToSlide>

                        {this.props.story.contributedStoryReducer.map((story, i) => {
                            return <ContributedStoryListItem
                                user_id={this.props.userInfo.id}
                                key={i}
                                header_photo={story.header_photo}
                                title={story.title}
                                intro={story.intro}
                                //just combining the DB columns into a props item 'author'
                                //for simplicity on the client
                                author={story.first_name + ' ' + story.last_name}
                                profile_pic={story.profile_pic}
                                likes={story.likes}
                            />
                        })}
                    </Carousel>
                </div>
            </div>

        )
    }
};

const mapStoreToProps = (reduxStore) => ({
    user: reduxStore.user,
    userInfo: reduxStore.user.userInfo,
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail.likes,
    contributedStories: reduxStore.story.contributedStoryReducer
});

export default connect(mapStoreToProps)(ContributedStoryList);