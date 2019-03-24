import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

import ChapterView from './ChapterView/ChapterView';
import ExistingStorySummary from './ExistingStorySummary';

class ExistingStoryMain extends Component {

  state = {
    editMode: false,
  }

  static propTypes = {
    storyDetail: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
  }

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
    // console.log(props);
    //editmode always false for completed stories
    // console.log('in getderived state', summary.completed)
    // console.log(summary);
    let authorCheck = false;
    if (summary.length > 0) {
      //sets author t/f only after summary loads
      // console.log('summary has loaded');
      authorCheck = (summary[0].author_id === user.id);
      // console.log(authorCheck);

      //if story is completed edit mode always false
      if (summary[0].completed) {
        // console.log('story complete');
        return { editMode: false }
      }
    }

    //default edit mode is false
    //searches contributors for user id
    const contributorCheck = contributor.filter(
      contributorObj => contributorObj.id === user.id).length > 0;
    // console.log(contributorCheck);
    //checks user id against author id

    if (contributorCheck || authorCheck) {
      // console.log('user is a contributor or author');
      return { editMode: true }
    } else {
      return null;
    }
  }

  render() {
    //took out likes and contributor for now b/c compile warnings
    const { summary, chapter, contributor } = this.props.storyDetail;
    const { editMode } = this.state;
    const { chapterId } = this.props.match.params;
    // console.log('existing story main state:', this.state)
    return (
      <div>
        {/* checks to make sure all relevant existing story data has loaded */}
        {summary.length > 0 && isNaN(chapterId) &&
          <ExistingStorySummary
            summary={summary}
            chapter={chapter}
            editMode={editMode}
            contributor={contributor} />
        }
        {/* if chapter id is on param loads chapter view */}
        {chapter.length > 0 && isNaN(chapterId) !== true &&
          <ChapterView
            summary={summary}
            chapter={chapter}
            contributor={contributor}
            // chapterId is key so component rerenders on params change
            key={chapterId}
            editMode={editMode} />
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