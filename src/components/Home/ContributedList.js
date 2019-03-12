import React, { Component } from 'react';
import ContributedListItem from './ContributedListItem';

import { connect } from 'react-redux';

class ContributedList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_MY_CONTRIBUTIONS' });
    }

    render() {

        return (
                <div className='contributions'>
                    {/* {JSON.stringify(this.props.state.story.storyReducer)} */}
                    <h3>My stories and contributions</h3>
                    {/* this line below will conditionally render 'story' or 'stories' depending on length of reducer */}
                    {
                        this.props.state.story.storyReducer.length === 1 ?
                            <h4>1 story live</h4> :
                            <h4>{this.props.state.story.storyReducer.length} stories live</h4>
                    }

                    {/* this div contains the actual story blocks */}
                    <div>
                        {this.props.state.story.storyReducer.map( (story, i) => {
                            return <ContributedListItem 
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

export default connect(mapStateToProps)(ContributedList);