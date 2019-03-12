import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import NewStoryChapter from './NewStoryChapter.js';
import TemplateChapter from './TemplateChapter.js';
import ContributorList from './../Contributor/ContributorList.js';
import NewStoryChapterItem from './NewStoryChapterItem.js';

// ant design import
import { Form, Input, Icon, Button } from 'antd';

class NewStoryMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            header_photo: '',
            caption: '',
        }
    }

    // function for setting local state with user inputs
    onInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    } // end onInputChange

    handleSubmit = (event) => {
        event.preventDefault();
        // add fields to the reducer
    }

    // load templates for the dropdown menu
    componentDidMount() {
        this.props.dispatch({ type: 'GET_TEMPLATE_STORY' });
    }

    render() {
        const formItemLayoutWithoutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },                
            }
        };

        return (
            <div>
                <h2>Create a Story</h2>
                <p>{this.state.title}</p>
                <p>{this.state.caption}</p>
                <ChooseTemplate />
                {this.props.story.title != '' ? <h4>{this.props.story.title}</h4> : <input name="title" onChange={this.onInputChange} />}
                <h4>Image goes here</h4>
                {this.props.story.title != '' ? <p>{this.props.story.caption}</p> :<input name="caption" onChange={this.onInputChange} />}
                {this.props.chapter.length > 0 ? <TemplateChapter chapter={this.props.chapter} /> : <NewStoryChapter />}
                <ContributorList />
            </div>
        )
    }

}

const mapStoreToProps = reduxStore => ({
    story: reduxStore.template.newTemplateStoryReducer,
    chapter: reduxStore.template.newTemplateChapterReducer,
});

export default connect(mapStoreToProps)(NewStoryMain);