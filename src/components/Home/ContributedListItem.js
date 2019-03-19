import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Avatar, Button, Icon } from 'antd';

const { Meta } = Card;

class ContributedListItem extends Component {

    handleReadStory = (event) => {
        this.props.history.push(`/existing-story/${this.props.story_id}`);
    }

    render() {

        return (
            <div>
                {/* {JSON.stringify(this.props.story.contributedStoryReducer[0].likes)} */}
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="headshot of author" src={this.props.header_photo} />}
                    actions={[<Button onClick={this.handleReadStory}>Read</Button>]}
                >
                    <Meta
                        avatar={<Avatar src={this.props.profile_pic} />}
                        title={this.props.title}
                    />
                    <h4>{this.props.author}</h4>
                    <Icon type='like'/><p>{this.props.story.contributedStoryReducer[0].likes}</p>
                </Card>
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