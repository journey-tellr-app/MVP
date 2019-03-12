import React, { Component } from 'react';
import ContributedStoryListItem from './ContributedStoryListItem';

import { connect } from 'react-redux';

class ContributedStoryList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_MY_CONTRIBUTIONS' });
    }

    render() {

        return (
            <div className='contributions'>
                <div>
                    {this.props.state.story.storyReducer.map((story, i) => {
                        return <ContributedStoryListItem
                            key={i}
                            header_photo={story.header_photo}
                            title={story.title}
                            intro={story.intro}
                            //just combining the DB columns into a props item 'author'
                            //for simplicity on the client
                            author={story.first_name + ' ' + story.last_name}
                            profile_pic={story.profile_pic}
                        />
                    })}
                </div>
            </div>

        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(ContributedStoryList);