import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CardDesigns.css';

//Ant design imports
import { Card, Button, Icon, Row, Col } from 'antd';

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
                <Card
                    id='card'
                    bordered={true}
                    style={{ width: 325 }}
                    cover={<img className="story-photo" alt="headshot of author" src={this.props.header_photo} />}
                    actions={[<Button onClick={this.handleLike} ><Icon type='like' />
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
    storyDetail: reduxStore.storyDetail
});

export default connect(mapStateToProps)(TopStoryItem);
// export default TopStoryItem;