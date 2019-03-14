import React, { Component } from 'react';
import { connect } from 'react-redux';

class ChapterView extends Component {
    //fetches data if user comes directly to this page

    render() {
        const { summary, likes, contributor,
            chapter } = this.props.storyDetail

        return (
            <div>
                <h1>Chapter View</h1>
            </div>
        )
    }
};

const mapRStoProps = (rs) => {
    return { storyDetail: rs.storyDetail }
}

export default connect(mapRStoProps)(ChapterView);