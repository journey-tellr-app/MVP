import React, { Component } from 'react';
import ContributedStoryListItem from './ContributedStoryListItem';

import { Carousel } from 'antd';

import { connect } from 'react-redux';

class ContributedStoryList extends Component {

    componentDidMount = () => {
        //the first dispatch gets the stories user is contributing to and renders them on
        //the profile page
        this.props.dispatch({ type: 'GET_MY_CONTRIBUTIONS' });
    }

    render() {

        return (
            <div className='contributions'>
                <div>
                    <Carousel swipeToSlide>
                        {this.props.contributedStories.map((story, i) => {
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
    userInfo: reduxStore.user.userInfo,
    contributedStories: reduxStore.story.contributedStoryReducer
});

export default connect(mapStoreToProps)(ContributedStoryList);
// export default ContributedStoryList;