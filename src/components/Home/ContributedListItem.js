import React, { Component } from 'react';
import './CardDesigns.css';
import { connect } from 'react-redux';

import { Card, Button, Row, Col, Badge } from 'antd';

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
                    actions={[<Button icon="like" onClick={this.handleLike} ><Badge count={this.props.likes} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}></Badge>
                    </Button>, <Button onClick={this.handleReadStory}>Read</Button>]}
                >
                    <Row>
                        <Col span={24}>
                            <h1 id="story-title">{this.props.title}</h1>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={6}>
                        </Col>
                        <Col span={6}>
                            <img id="author-avatar" alt="author avatar" src={this.props.profile_pic} />
                        </Col>

                        <Col span={6}>
                            <h5 id="story-author" align="left">By {this.props.author}</h5>
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
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