import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import ChapterEditButton from './ChapterEditButton';
import ImageUpload from './../../../ImageUpload/ImageUpload.js';

import { PageHeader, Pagination, Card } from 'antd';

class ChapterView extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        contributor: PropTypes.array.isRequired,
    };

    turnPage = (page, pageSize) => {
        this.props.history.push(`${page}`)
    }

    render() {
        //took out likes for now
        const { summary, chapter, contributor, editMode } = this.props;
        const { chapterId } = this.props.match.params;
        console.log(`Edit mode`, editMode);

        // console.log('editMode:', this.state.editMode);
        const contributorSum = contributor.length;
        let contributorDescription;
        if (contributorSum === 0) {
            contributorDescription = '';
        } else if (contributorSum === 1) {
            contributorDescription = ' and one contributor';
        } else if (contributorSum < 2) {
            contributorDescription = ` and ${contributorSum} contributors`;
        }
        const currChapter = chapter.find((item) => (item.id === Number(chapterId)));
        console.log(currChapter);

        return (

            <div>
                {chapterId !== undefined ?
                    <div>
                        <PageHeader
                            title={`Chapter ${currChapter.order}: ${currChapter.title}`}
                            subTitle={`in story "${summary.title}" by ${summary.author_name}${contributorDescription}. `}
                        />
                        {editMode &&
                            <ChapterEditButton
                                valueToEdit={currChapter.title}
                                type='Chapter'
                                name='Title'
                                id={currChapter.id} />}
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt={`Chapter ${chapterId} header`} src={currChapter.chapter_photo} />}
                        >
                            <Card.Meta
                                description={currChapter.text}
                            />
                        </Card>
                        {editMode &&
                        <div>
                        <ChapterEditButton
                            valueToEdit={currChapter.text}
                            type='Chapter'
                            name='Text'
                            id={currChapter.id} />
                        <ImageUpload photoDetails={{typeOfPhoto:'CHAPTER', title: "Add chapter picture"}}/>
                        </div>
                        }
                        <Pagination
                            defaultCurrent={Number(chapterId)}
                            pageSize={1}
                            total={Number(chapter.length)}
                            onChange={this.turnPage} />
                    </div>
                    :
                    <p> Page is loading.</p>
                }
            </div>
        )
    }
};

const ChapterViewWithRouter = withRouter(ChapterView);

const mapStoreToProps = reduxStore => ({
    image: reduxStore.chapter.chapterImageReducer,
});

export default connect(mapStoreToProps)(ChapterViewWithRouter);