import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { PageHeader, Pagination } from 'antd';

class ChapterView extends Component {
    componentDidMount() {
        this.determineEditMode();
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        contributor: PropTypes.array.isRequired,
        user: PropTypes.object.isRequired,
    };

    state = {
        editMode: false,
    }

    //checks story contributors and author for user id and returns status accordingly
    determineEditMode = () => {
        const { contributor, user, summary } = this.props;
        let editModeValue = false;
        const contributorCheck = contributor.filter(
            contributorObj => contributorObj.person_id === user.id).length > 0;
        // console.log(contributorCheckArr.length > 0);
        const authorCheck = summary.author_id === user.id;
        if (contributorCheck || authorCheck) {
            editModeValue = true;
        }
        return this.setState({
            editMode: editModeValue,
        })
    }

    turnPage = (page, pageSize) => {
        console.log(page);
        this.props.history.push(`${page}`)
    }

    render() {
        //took out likes for now
        const { summary, chapter, contributor } = this.props
        const { chapterId } = this.props.match.params;
        // console.log('editMode:', this.state.editMode);
        const contributorSum = contributor.length;
        let contributorDescription;
        console.log(this.props.match);
        switch(contributorSum){
            case( 1 ): 
                contributorDescription = ' and one contributor';
                break;
            case ( 2 ):
                contributorDescription = ` and ${contributorSum} contributors`;
                break;
            default:
                contributorDescription = '';
                break;
        }
        
        return (
            <div>
                <PageHeader
                    title={`Chapter ${chapterId}: ${chapter[chapterId - 1].title}`}
                    subTitle={`in story "${summary[0].title}" by ${summary[0].author_name}${contributorDescription}. `}
                />
                <Pagination 
                    defaultCurrent={Number(chapterId)}
                    pageSize={1} 
                    total={Number(chapter.length)}
                    onChange={this.turnPage} />

                <h1>Chapter View</h1>

            </div>
        )
    }
};

const ChapterViewWithRouter = withRouter(ChapterView);

const mapRStoProps = (rs) => {
    return {
        user: rs.user.userInfo
    }
}

export default connect(mapRStoProps)(ChapterViewWithRouter);