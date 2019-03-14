import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChapterView from './ChapterView';
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

  render() {
    //took out likes and contributor for now b/c compile warnings
    const { summary, chapter, contributor } = this.props.storyDetail;

    const { params } = this.props.match
    return (
      <div>
        {/* checks to make sure all relevant existing story data has loaded */}
        {summary.length > 0 && chapter.length > 0 ?
          (() => {
            switch (isNaN(params.chapterId)) {
              //no chapter id sent on params
              case (true):
                return <ExistingStorySummary
                  summary={summary}
                  chapter={chapter} />
              //chapter id sent on params
              case (false):
                return <ChapterView 
                  summary={summary} 
                  chapter={chapter}
                  contributor={contributor}
                  key={params.chapterId}/>
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
})

export default connect(mapStoreToProps)(ExistingStoryMain);