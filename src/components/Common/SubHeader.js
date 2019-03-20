import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Typography } from 'antd';
import './SubHeader.css';

const { Title } = Typography;

export default class SubHeader extends Component {
    static propTypes = {
        headerText: PropTypes.string.isRequired,
    }
    render() {
        return (
            <Row type="flex"
                justify="space-around"
                align="middle"
                gutter={16}
                className='sub-header'>
                <Title 
                    level={2} 
                    className='sub-header-text'>
                    {this.props.headerText}
                </Title>
            </Row>
        )
    }
}
