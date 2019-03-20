import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfilePage.css';
import { Card, Icon } from 'antd';
// import { Button } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;


class ContributedStoryListItem extends Component {

    handleReadStory = (event) => {
        this.props.history.push(`/existing-story/${this.props.story_id}`);
    }

    componentDidMount = () => {
        this.handleDispatch();
    }

    handleDispatch = () => {
        this.props.dispatch({
            type: 'GET_STORY_LIKES',
            payload: this.props.story.contributedStoryReducer[0].story_id
        })
    }
    handleLike = (event) => {
        this.props.dispatch({
            type: 'LIKE_CONTRIBUTED_STORY',
            payload: {
                user_id: this.props.user_id,
                story_id: this.props.story.contributedStoryReducer[0].story_id
            }
        });
    }

    render() {

        return (
            <div>
                {this.props.storyDetail.likes.length !== 0 ?
                    <Card
                        className="profile-story-cards"
                        style={{ width: 275 }}
                        cover={<img onClick={this.handleReadStory} width='100px' height='100px' src={this.props.header_photo} alt="story" />}
                        hoverable
                    >

                        <Title onClick={this.handleReadStory} level={4}>{this.props.title}</Title>
                        <Icon type='like' /><p>{this.props.story.contributedStoryReducer[0].likes}</p>



                    </Card> : (<p>loading...</p>)}




            </div>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail
});

export default connect(mapStateToProps)(ContributedStoryListItem);