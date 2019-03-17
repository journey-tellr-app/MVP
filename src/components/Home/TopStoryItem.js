import React, { Component } from 'react';
// import { connect } from 'react-redux';
//Ant design imports
import { Card } from 'antd';
import { Typography } from 'antd';
import { Button } from 'antd';
const { Title } = Typography;


class TopStoryItem extends Component {

    handleReadStory = (event) => {
        this.props.history.push(`/existing-story/${this.props.id}`);
    }

    render() {
        const { header_photo, profile_pic, name } = this.props;
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
                    <img 
                        className='header_photo'
                        width='150px'
                        height='100px'
                        src={this.props.header_photo}
                        alt={`${header_photo}`} />
                    <Title level={4}>Started by {name}</Title>
                    <img 
                        className='profile_pic'
                        width='150px'
                        height='100px'
                        src={profile_pic}
                        alt={`Headshot of the author ${name}`} />
                    <Button onClick={this.handleReadStory}>Read</Button>
                </Card>
            </div>
        )
    }
};

// const mapStateToProps = (state) => ({
//     state
// });

// export default connect(mapStateToProps)(TopStoryItem);
export default TopStoryItem;