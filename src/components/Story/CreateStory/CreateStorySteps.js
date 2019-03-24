import React, { Component } from 'react';

import './CreateStory.css'

// ant design import
import { Steps } from 'antd';

class CreateStorySteps extends Component {

    render() {
        return (          
                <Steps current={Number(this.props.current)} size='small'>
                    <Steps.Step title="New or Template" />
                    <Steps.Step title="Story Details" />
                    <Steps.Step title="Chapters" />
                    <Steps.Step title="Contributors" />
                </Steps>
        )
    }

}

export default CreateStorySteps;