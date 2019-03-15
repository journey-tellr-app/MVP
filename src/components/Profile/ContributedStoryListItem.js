import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'antd';
// import { Button } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

<<<<<<< HEAD
=======

>>>>>>> b9540c19f121a075aeb61785397fd726fa35fa69
class ContributedStoryListItem extends Component {

    handleReadStory = (event) => {
        console.log('in handleRead');
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

    render() {

        return (
            <div>
                {this.props.storyDetail.likes.length !== 0 ?
                <Card
<<<<<<< HEAD
                    style={{ width: 300 }}
                    cover={<img width='150px' height='100px' src={this.props.header_photo} alt="story" />}
                >
=======

                    style={{ width: 300 }}
                    cover={<img width='150px' height='100px' src={this.props.header_photo} alt="story" />}
                >

>>>>>>> b9540c19f121a075aeb61785397fd726fa35fa69

                <Title level={4}>{this.props.title}</Title>
                <Icon type='like' /><p>{this.props.storyDetail.likes[0].likes}</p>

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