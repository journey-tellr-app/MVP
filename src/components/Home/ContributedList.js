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

<<<<<<< HEAD
    handleStartStory = () => {
        console.log('button clicked');
    }
=======
    render() {
        //these lines will render 'story' or 'stories' depending on the length
        //of the contributedStoryReducer
        // const settings = {
        //     dots: true,
        //     slidesToShow: 2,
        // }


        // let header;
        // if (this.props.contributedStories.length === 1) {
        //     header = <h4>1 story live</h4>;
        // } else {
        //     header = <h4>{this.props.contributedStories.length} stories live</h4>
        // }
>>>>>>> dbd0603ed888ec758519c8e4c2d3da844b576956

    render() {

        return (
            //this component will render all of the stories a 
            //user has started or contributed to.
            //If the user has not begun or contributed to a story,
            //a button prompting the user to create a new one will render.
            <div className='contributions'>
                {this.props.contributedStories.length !== 0 ?
                    (<div>
                        <h3 align='center'>My Stories and Contributions</h3>

                        {/* this div contains the actual story blocks */}
                        <Carousel swipeToSlide>
                            {this.props.contributedStories.map((story, i) => {
                                return <ContributedListItem
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
                    </div>) : (<div>
                                   {/* render this button if the user has no contributed stories */}
                                   <Button align='center' onClick={this.handleStartStory}>Start Your First Story!</Button>
                               </div>)}
            </div>

        )
    }
};

const mapStateToProps = (state) => ({
    userInfo: state.user.userInfo,
    contributedStories: state.story.contributedStoryReducer
});

export default connect(mapStateToProps)(ContributedList);