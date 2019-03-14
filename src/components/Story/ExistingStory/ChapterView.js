import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { PageHeader } from 'antd';

class ChapterView extends Component {
    //fetches data if user comes directly to this page
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const { summary, likes, contributor,
            chapter } = this.props
        const { params } = this.props.match;
        
        return (
            <div>
                <PageHeader
                    title={`Chapter ${params.chapterId}: ${chapter[params.chapterId - 1].title}`}
                    subTitle={`in story "${summary[0].title}" by ${summary[0].author_name}`}
                />

                <h1>Chapter View</h1>

            </div>
        )
    }
};

const ChapterViewWithRouter = withRouter(ChapterView);

export default connect()(ChapterViewWithRouter);