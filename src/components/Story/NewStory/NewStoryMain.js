import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseTemplate from './ChooseTemplate.js';
import NewStoryChapter from './NewStoryChapter.js';
import ContributorList from './../Contributor/ContributorList.js';

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

    componentDidMount() {
        this.props.dispatch({ type: 'GET_TEMPLATE_STORY' });
    }

    render() {
        return (
            <div>
                <h2>Create a Story</h2>
                <p>{this.state.title}</p>
                <p>{this.state.caption}</p>
                <ChooseTemplate />
                <form>
                    <input name="title" onChange={this.onInputChange}/>
                    <h4>Image goes here</h4>
                    <input name="caption" onChange={this.onInputChange}/>
                </form>
                <NewStoryChapter />
                <ContributorList />
            </div>
        )
    }

}

const mapStoreToProps = reduxStore => ({
    reduxStore,
});

export default connect(mapStoreToProps)(NewStoryMain);