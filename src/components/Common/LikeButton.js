import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

const LikeButton = props => (
    <Button
        // dispatch is subject to change
        onClick={() => props.dispatch({ type: 'LIKE' })}
        icon="like"
    >
        Like
  </Button>
);

export default connect()(LikeButton);