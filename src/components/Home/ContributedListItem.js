import React, { Component } from 'react';
import './CardDesigns.css';
import { connect } from 'react-redux';

import { Card, Avatar, Button, Icon } from 'antd';

const { Meta } = Card;

class ContributedListItem extends Component {

    handleReadStory = (event) => {
        this.props.history.push(`/existing-story/${this.props.story_id}`);
    }

    handleLike = (event) => {

        this.props.dispatch({
            type: 'LIKE_CONTRIBUTED_STORY',
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
            <div>
                <Card
                    id='card'
                    bordered={true}
                    style={{ width: 325 }}
                    cover={<img className="story-photo" alt="headshot of author" src={this.props.header_photo} />}
                    actions={[<Button onClick={this.handleLike} ><Icon type='like' />
                    </Button>, <Button onClick={this.handleReadStory}>Read</Button>]}
                >
                    <Meta

                        avatar={<img className="author-avatar" alt="author avatar" src={this.props.profile_pic} />}
                        title={this.props.title}
                    />
                    <br />
                    <h5>by {this.props.author}</h5>
                    <p>{this.props.likes} Likes</p>
                </Card>
                <br />
                <br />
            </div>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail
});

export default connect(mapStateToProps)(ContributedListItem);

// export default ContributedListItem;