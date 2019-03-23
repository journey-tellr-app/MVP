import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfilePage.css';
import { Card, Icon } from 'antd';
import { Button } from 'antd';
import { Typography, Spin } from 'antd';

const { Title } = Typography;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;



class ContributedStoryListItem extends Component {

    handleLike = (event) => {

        this.props.dispatch({
            type: 'LIKE_CONTRIBUTED_STORY',
            payload: {
                user_id: this.props.user_id,
                story_id: this.props.story_id
            }
        });

    }

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
            <div className="card-div">
                {this.props.storyDetail.likes.length !== 0 ?
                    <Card
                        className="profile-story-cards"
                        style={{ width: 275 }}
                        cover={<img className="story-photo" src={this.props.header_photo} alt="story" />}
                        actions={[<Button onClick={this.handleReadStory}>Read</Button>]}
                    >

                        <Title onClick={this.handleReadStory} level={4} >{this.props.title}</Title>
                        <Button id="like-btn" onClick={this.handleLike}>
                            <Icon type='like' />
                        </Button>
                        <p>{this.props.likes} Likes!</p>
                    </Card> : (<Spin indicator={antIcon} />)}
            </div>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail
});

export default connect(mapStateToProps)(ContributedStoryListItem);