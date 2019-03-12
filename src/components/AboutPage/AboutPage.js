import React, { Component } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
const axios = require('axios');

class AboutPage extends Component {
  constructor(props) {
    super(props);

  }

  //posts to fakes.router.js
  addFakePeople = (event) => {
    axios.post('/fakes');
  }

  //posts to fakes.router.js
  addFakeStories = (event) => {
    axios.post('/fakes/story');
  }


  render() {

    return (
      <div>
        <div>
          <button onClick={this.addFakePeople}>Add 300 people to the database</button><br />
          <button onClick={this.addFakeStories}>Add 30 stories to the database</button>
          <ImageUpload typeOfPhoto='PERSON' />  {/*Need to send props so component knows where to send and store */}
        </div>
      </div>
    )
  }

}
export default AboutPage;
