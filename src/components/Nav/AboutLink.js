import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {Typography, Icon} from 'antd';

export default class AboutLink extends Component {
    //may recieve function from side drawer to handle closing

  render() {
    return (
        <Link to="/about" onClick={this.props.onClose}>
            <Typography.Text><Icon type='info-circle' />About</Typography.Text>
        </Link>
    )
  }
}
