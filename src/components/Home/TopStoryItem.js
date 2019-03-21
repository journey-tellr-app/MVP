import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CardDesigns.css';

//Ant design imports
import { Card, Avatar, Button, Icon } from 'antd';
const { Meta } = Card;

class TopStoryItem extends Component {

    handleReadStory = (event) => {
        console.log('in hRS', this.props);

        this.props.history.push(`/existing-story/${this.props.story_id}`);
    }

    handleLike = (event) => {
        console.log(this.props);
        
        this.props.dispatch({
            type: 'LIKE_TOP_STORY',
            payload: {
                user_id: this.props.user_id,
                story_id: this.props.story_id
            }
        });
    }

    componentDidMount = (event) => {
        this.props.dispatch({
            type: 'GET_CONTRIBUTORS',
            payload: this.props.story_id
        })
    }

    render() {

        return (
            <div align='center'>
            {/* {JSON.stringify(this.props.story.contributors)}  */}
                <Card
                    id='card'
                    style={{ width: 300 }}
                    cover={<img alt="headshot of author" src={this.props.header_photo} />}
                    actions={[<Button onClick={this.handleReadStory}>Read</Button>]}
                >
                    <Meta
                        id='card'
                        avatar={<Avatar src={this.props.profile_pic} />}
                        title={this.props.title}
                    />
                    <br/>
                    <h4 align='center'>Story by {this.props.name}</h4>
                    <Icon type='like' onClick={this.handleLike} />
                    <p>{this.props.likes} Likes!</p>
                </Card>
                {/* these break tags are so the user can see the carousel dots
                at the bottom of the cards */}
                <br/>
                <br/>
            </div>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail
});

export default connect(mapStateToProps)(TopStoryItem);
// export default TopStoryItem;