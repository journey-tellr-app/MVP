import React, { Component } from 'react';
import ContributedListItem from './ContributedListItem';

import { connect } from 'react-redux';

class ContributedList extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: 'GET_MY_CONTRIBUTIONS' });
    }


    render() {


        return (
            <div>
                {/* {JSON.stringify(this.props.state.story.storyReducer)} */}

                <div className='contributions'>
                    <h3>My stories and contributions</h3>
                    {/* this line below will conditionally render 'story' or 'stories' depending on length of reducer */}
                    {
                        this.props.state.story.storyReducer.length === 1 ?
                            <h4>1 story live</h4> :
                            <h4>{this.props.state.story.storyReducer.length} stories live</h4>
                    }

                    <div>
                        {this.props.state.story.storyReducer.map( (story, i) => {
                            return <ContributedListItem 
                                key={i}
                                header_photo={story.header_photo}
                                title={story.title}
                                intro={story.intro}
                                author={story.first_name + ' ' + story.last_name}
                                profile_pic={story.profile_pic}
                            />
                        })}
                    </div>
                </div>

                <div className='company-stories'>
                    <h3>My company's stories</h3>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(ContributedList);