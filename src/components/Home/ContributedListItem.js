import React, { Component } from 'react';
// import { connect } from 'react-redux';

//Ant design imports
import { Card } from 'antd';
import { Typography } from 'antd';
import { Button } from 'antd';
const { Title } = Typography;

class ContributedListItem extends Component {

    handleReadStory = (event) => {
        this.props.history.push(`/existing-story/${this.props.story_id}`);
    }

    render() {

        return (
            <div>
                <Card
                    style={{
                        width: 300,
                        height: 375
                    }}
                    cover={<img width='150px'
                        height='100px'
                        src={this.props.header_photo}
                        alt="story"
                    />}
                    bordered={true}
                >
                    <Title level={4}>{this.props.title}</Title>
                    <img 
                        className='header_photo'
                        width=''
                        height='100px'
                        src={this.props.header_photo}
                        alt='headshot of author' 
                    /><br/>
                    <Button onClick={this.handleReadStory}>Read</Button>
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