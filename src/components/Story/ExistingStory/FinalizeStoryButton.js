import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Button, Row, Col } from 'antd';

class FinalizeStoryButton extends Component {

    handlePostStory = () => {
        console.log('post story clicked');
    }

    render() {
        const { user, summary } = this.props;
        return (
            <div>
                {user.id === summary.author_id &&
                    <Row type='flex' justify='center'>
                        <Col span={18}>
                            <Button
                                type="primary"
                                onClick={this.handlePostStory}
                                style={{ width: '100%' }}>
                                Finalize Story</Button>
                        </Col>
                    </Row>
                }
            </div>
        )
    }
}

const mapRStoProps = (rs) => {
    return {
        user: rs.user.userInfo,
        summary: rs.storyDetail.summary[0]
    }
}

export default connect(mapRStoProps)(FinalizeStoryButton);
