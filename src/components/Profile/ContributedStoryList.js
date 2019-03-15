import React, { Component } from 'react';
import ContributedStoryListItem from './ContributedStoryListItem';

import { connect } from 'react-redux';

class ContributedStoryList extends Component {

    componentDidMount = () => {
        const action = {
            type: 'GET_MY_CONTRIBUTIONS',
            nextType: 'GET_STORY_LIKES'
        }
        this.props.dispatch(action);
    }

    render() {

        return (
            <div className='contributions'>
                <div>
                    {JSON.stringify(this.props.storyDetail)}
                    {this.props.story.contributedStoryReducer.map((story, i) => {
                        return <ContributedStoryListItem
                            key={i}
                            header_photo={story.header_photo}
                            title={story.title}
                            intro={story.intro}
                            //just combining the DB columns into a props item 'author'
                            //for simplicity on the client
                            author={story.first_name + ' ' + story.last_name}
                            profile_pic={story.profile_pic}
                            likes={this.props.storyDetail.likes}
                        />
                    })}
                </div>
            </div>

        )
    }
};

const mapStoreToProps = (reduxStore) => ({
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail.likes,
});

export default connect(mapStoreToProps)(ContributedStoryList);