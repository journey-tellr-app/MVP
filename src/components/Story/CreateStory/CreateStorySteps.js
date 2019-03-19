import React, { Component } from 'react';

// ant design import
import { Steps } from 'antd';

class CreateStorySteps extends Component {

    render() {
        return (
            <Steps direction="horizontal" size="small" current={Number(this.props.current)}>
                <Steps.Step title="Story Type" />
                <Steps.Step title="Details" />
                <Steps.Step title="Chapters" />
                <Steps.Step title="Contributors" />
            </Steps>
        )
    }

}

export default CreateStorySteps;