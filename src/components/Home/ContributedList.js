import React, { Component } from 'react';
import ContributedListItem from './ContributedListItem';

import propTypes from 'prop-types';
import { Carousel, Button } from 'antd';
import { connect } from 'react-redux';

class ContributedList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_MY_CONTRIBUTIONS' });
    }

    static propTypes = {
        contributedStories: propTypes.array.isRequired,
    };
    handleStartStory = () => {
        // console.log('in hSS');
        this.props.history.push(`/choose-template`)
    }

    render() {
        return (
            //this component will render all of the stories a 
            //user has started or contributed to.
            //If the user has not begun or contributed to a story,
            //a button prompting the user to create a new one will render.
            <div className='contributions'>
                {this.props.contributedStories.length !== 0 ?
                    (<div>
                        {/* <h3 align='center'>My Stories and Contributions</h3> */}
                        {/* this div contains the actual story blocks */}
                        <Carousel swipeToSlide>
                            {this.props.contributedStories.map((story, i) => {
                                return <ContributedListItem
                                    story={story}
                                    user_id={this.props.userInfo.id}
                                    history={this.props.history}
                                    story_id={story.story_id}
                                    key={i}
                                    header_photo={story.header_photo}
                                    title={story.title}
                                    intro={story.intro}
                                    //combining the DB columns into a props item 'author'
                                    //for simplicity on the client
                                    author={story.first_name + ' ' + story.last_name}
                                    profile_pic={story.profile_pic}
                                    likes={story.likes}
                                />
                            })}
                        </Carousel>
                    </div>) : (<div className='center-button'>
                        {/* render this button if the user has no contributed stories */}
                        <Button align='center' type='primary' onClick={this.handleStartStory}>Start Your First Story!</Button>
                    </div>)}
            </div>

        )
    }
};

const mapStateToProps = (state) => ({
    story: state.story,
    userInfo: state.user.userInfo,
    contributedStories: state.story.contributedStoryReducer
});

export default connect(mapStateToProps)(ContributedList);