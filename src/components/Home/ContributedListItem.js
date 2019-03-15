import React, { Component } from 'react';
// import { connect } from 'react-redux';

import { Card, Icon, Avatar, Button } from 'antd';

const { Meta } = Card;

class ContributedListItem extends Component {

    handleReadStory = (event) => {
        this.props.history.push(`/existing-story/${this.props.story_id}`);
    }

    render() {

        return (
            <div>
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="headshot of author" src={this.props.header_photo} />}
                    actions={[<Button>Read</Button>]}
                >
                    <Meta
                        avatar={<Avatar src={this.props.profile_pic} />}
                        title={this.props.title}
                    />
                    <h4>{this.props.author}</h4>
                </Card>
            </div>
        )
    }
};

// const mapStateToProps = (state) => ({
//     state
// });

// export default connect(mapStateToProps)(ContributedListItem);

export default ContributedListItem;