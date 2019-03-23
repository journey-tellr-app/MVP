import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Row, Col, Modal } from 'antd';

const confirm = Modal.confirm;

class FinalizeStoryButton extends Component {

    handlePostStory = () => {
        console.log('post story clicked');
        //confirm finishing story with modal
        
        //onOk function does not have access to component scope so pulling these off props now
        const { dispatch, summary } = this.props;
        confirm({
            title: 'Are you done editing and ready to complete this story?',
            content: `Please review the story summary, chapter contents, and photos before completing the story.`,
            okText: 'Complete Story',
            okType: 'danger',
            okButtonProps: {
                type: 'danger',
            },
            cancelText: 'Keep Editing',
            onOk() {
                dispatch({
                    type: 'COMPLETE_STORY',
                    payload: summary.id
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });


    }

    render() {
        const { user, summary } = this.props;
        return (
            <div>
                {/* only shows button if user is author and story has not already been completed */}
                {user.id === summary.author_id && summary.completed === false &&
                    <Row type='flex' justify='center'>
                        <Col span={18}>
                            <Button
                                type="primary"
                                onClick={this.handlePostStory}
                                style={{ width: '100%', margin: '20px 0' }}>
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
