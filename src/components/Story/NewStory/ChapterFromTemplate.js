import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChapterFromTemplate extends Component {
    render() {
        return (
            <div>
                {this.props.chapter.map((item, i) => (
                    <p key={i}>Chapter:{i + 1} - {item.title}</p>
                ))}
            </div>
        )
    }
};

export default connect()(ChapterFromTemplate);