import React, { Component } from 'react';

import './CreateStory.css'

// ant design import
import { Steps } from 'antd';

class CreateStorySteps extends Component {

    render() {
        return (

            <div className='story-steps'>            
                <Steps current={Number(this.props.current)} >
                    <Steps.Step title="Start" />
                    <Steps.Step title="Details" />
                    <Steps.Step title="Chapters" />
                    <Steps.Step title="Contributors" />
                </Steps>
            </div>

            
        )
    }

}

export default CreateStorySteps;