import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import ChapterView from './ChapterView/ChapterView';
import ExistingStorySummary from './ExistingStorySummary';

class ExistingStoryMain extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    this.props.dispatch({
      type: 'GET_INDIVIDUAL_STORY',
      payload: id
    });
    this.props.dispatch({
      type: 'GET_STORY_CHAPTER_DETAIL',
      payload: id
    });
    this.props.dispatch({
      type: 'GET_STORY_CONTRIBUTORS',
      payload: id
    });
  }

  //checks incoming props to determine state value 
  //checks story contributors and author for user id and returns status accordingly
  static getDerivedStateFromProps(props, state) {
    const { contributor, summary } = props.storyDetail;
    const { user } = props;
    //default edit mode is false
    //searches contributors for user id
    const contributorCheck = contributor.filter(
      contributorObj => contributorObj.person_id === user.id).length > 0;
    // console.log(contributorCheck);
    //checks user id against author id
    const authorCheck = summary.author_id === user.id;
    if (contributorCheck || authorCheck) {
      return {editMode: true}
    } else {
      return null;
    }
  }

  static propTypes = {
    storyDetail: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

  state = {
    editMode: false,
  }

  render() {
    //took out likes and contributor for now b/c compile warnings
    const { summary, chapter, contributor } = this.props.storyDetail;
    const { editMode } = this.state;
    const { params } = this.props.match
    // console.log('existing story main state:', this.state)
    return (
      <div>
        {/* checks to make sure all relevant existing story data has loaded */}
        {summary.length > 0 ?
          (() => {
            switch (isNaN(params.chapterId)) {
              //no chapter id sent on params
              case (true):
                return <ExistingStorySummary
                  summary={summary}
                  chapter={chapter}
                  editMode={editMode} />
              //chapter id sent on params
              case (false):
                return <ChapterView
                  summary={summary}
                  chapter={chapter}
                  contributor={contributor}
                  key={params.chapterId}
                  editMode={editMode} />
              default:
                return <p>Error loading component.</p>
            }
          })()
          :
          <p>Page is loading :D </p>
        }
      </div>
    )
  }
}

const mapStoreToProps = reduxStore => ({
  storyDetail: reduxStore.storyDetail,
  user: reduxStore.user.userInfo,
})

export default connect(mapStoreToProps)(ExistingStoryMain);