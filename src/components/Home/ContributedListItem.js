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
            <div align='center'>
                <Card
                    id='card'
                    bordered={true}
                    style={{ width: 300 }}
                    cover={<img alt="headshot of author" src={this.props.header_photo} />}
                    actions={[<Button type='primary'
                                      onClick={this.handleReadStory}>Read
                              </Button>]}
                >
                    <Meta
                        align='center'
                        avatar={<Avatar src={this.props.profile_pic} />}
                        title={this.props.title}
                    />
                    <br/>
                    <h4 align='center'>Story by {this.props.author}</h4>
                    <Button onClick={this.handleLike} >
                        <Icon type='like'/>
                    </Button>
                    <p>{this.props.likes} Likes!</p>
                </Card>
                <br />
                <br />
            </div>
        )
    }
};

const mapStateToProps = (reduxStore) => ({
    story: reduxStore.story,
    storyDetail: reduxStore.storyDetail,
    contributors: reduxStore.story.contributors
});

export default connect(mapStateToProps)(ContributedListItem);

// export default ContributedListItem;