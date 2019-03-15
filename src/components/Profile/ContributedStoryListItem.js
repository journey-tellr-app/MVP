import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon } from 'antd';
// import { Button } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;



// const { Meta } = Card;

class ContributedStoryListItem extends Component {

    handleReadStory = (event) => {
        console.log('in handleRead');
    }

    render() {

        return (
            <div>
                <Card
                    style={{ width: 300 }}
                    cover={<img width='150px' height='100px' src={this.props.header_photo} alt="story" />}
                >

                    <Title level={4}>{this.props.title}</Title>
                    <Icon type='like' />

                </Card>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    state
});

export default connect(mapStateToProps)(ContributedStoryListItem);