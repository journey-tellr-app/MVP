import React, { Component } from 'react';
// import ImageUpload from '../ImageUpload/ImageUpload';
const axios = require('axios');

class ProfilePage extends Component {

    //posts to fakes.router.js
    addFakePeople = (event) => {
        axios.post('/fakes');
    }

    //posts to fakes.router.js
    addFakeStories = (event) => {
        axios.post('/fakes/story');
    }

    //this will post to fakes.router.js
    //and add 50 fake chapters to chapter table
    addFakeChapters = (event) => {
        axios.post('fakes/chapter');
    }

    addFakeLikes = (event) => {
        axios.post('fakes/likes');
    }

    render() {

        return (
            <div>
                <div>
                    <button onClick={this.addFakePeople}>Add 300 people to the database</button><br />
                    <button onClick={this.addFakeStories}>Add 30 stories to the database</button><br />
                    <button onClick={this.addFakeChapters}>Add 50 chapters to the database</button><br />
                    <button onClick={this.addFakeLikes}>Add 25 likes to random stories</button>
                    {/* <ImageUpload /> */}
                </div>
            </div>
        )
    }

}
export default ProfilePage;