import React from 'react';
import { connect } from 'react-redux';

const LikeButton = props => (
    <button
        // dispatch is subject to change
        onClick={() => props.dispatch({ type: 'LIKE' })}
    >
        Like
  </button>
);

export default connect()(LikeButton);