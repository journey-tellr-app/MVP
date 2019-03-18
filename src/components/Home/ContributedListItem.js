import React, { Component } from 'react';
// import { connect } from 'react-redux';


//Ant design imports
import { Card } from 'antd';
import { Typography } from 'antd';
import { Button } from 'antd';
import { Avatar } from 'antd';
const { Title } = Typography;


const { Meta } = Card;


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