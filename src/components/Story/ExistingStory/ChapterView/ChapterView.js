import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import ImageUpload from './../../../ImageUpload/ImageUpload.js';
import EditButton from '../EditButton';

import { PageHeader, Pagination, Card, Button, Row, Icon } from 'antd';

class ChapterView extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        contributor: PropTypes.array.isRequired,
        editMode: PropTypes.bool.isRequired,
    };

    turnPage = (page, pageSize) => {
        this.props.history.push(`${page}`)
    }

    render() {
        //took out likes for now
        const { summary, chapter, contributor, editMode } = this.props;
        const { chapterId } = this.props.match.params;
        console.log(chapterId, chapter);
        
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
        const currChapter = chapter[chapterId];
        console.log('currChapter', currChapter);

        return (

            <div>
                {currChapter !== undefined ?
                    <Row type="flex" justify="space-around" align="middle">
                        <PageHeader
                            title={`Chapter ${currChapter.order}: ${currChapter.title}`}
                            subTitle={`in story "${summary[0].title}" by ${summary[0].author_name}${contributorDescription}. `}
                        />
                        {editMode &&
                            <EditButton
                                valueToEdit={currChapter.title}
                                type='Chapter'
                                name='Title'
                                id={currChapter.id} />}
                        <Card
                            style={{ width: 300 }}
                            cover={<img alt={`Chapter ${chapterId} header`} src={currChapter.chapter_photo} />}
                            actions={editMode ? [<EditButton valueToEdit={currChapter.text}
                                                             type='Chapter'
                                                             name='Text'
                                                             id={currChapter.id} />,
                                                 <ImageUpload photoDetails={{typeOfPhoto:'CHAPTER',
                                                                             title: "edit",
                                                                             chapterId: currChapter.id, }}/>,
                                                ] : '' }
                        > 
                            <Card.Meta
                                description={currChapter.text}
                            />
                        </Card>
                        {/* {editMode &&
                        <div>
                            <EditButton
                                valueToEdit={currChapter.text}
                                type='Chapter'
                                name='Text'
                                id={currChapter.id} />
                            <ImageUpload photoDetails={{typeOfPhoto:'CHAPTER',
                                                        title: "Edit story picture",
                                                        chapterId: currChapter.id,
                                                       }}/>
                        </div>
                        } */}
                        <Pagination
                            defaultCurrent={Number(chapterId)}
                            pageSize={1}
                            total={Number(chapter.length)}
                            onChange={this.turnPage} />
                    </Row>
                    :
                    <p> Page is loading.</p>
                }
            </div>
        )
    }
};

const ChapterViewWithRouter = withRouter(ChapterView);

export default connect()(ChapterViewWithRouter);