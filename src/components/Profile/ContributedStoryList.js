import React, { Component } from 'react';
import ContributedStoryListItem from './ContributedStoryListItem';


import { connect } from 'react-redux';

//this file is being used on the profile page to render
//all of the stories that a user has BEGUN
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
                    {/* {JSON.stringify(this.props.storyDetail.likes)} */}

                    {this.props.story.contributedStoryReducer.map((story, i) => {
                        return <ContributedStoryListItem
                            user_id={this.props.userInfo.id}
                            key={i}
                            history={this.props.history}
                            story_id={story.story_id}
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

                </div>
            </div>

        )
    }
};

const mapStoreToProps = (reduxStore) => ({
    userInfo: reduxStore.user.userInfo,
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail.likes,
    contributedStories: reduxStore.story.contributedStoryReducer,

});

export default connect(mapStoreToProps)(ContributedStoryList);