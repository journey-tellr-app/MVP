import React, { Component } from 'react';
const axios = require('axios');

class AboutPage extends Component {

  addFakePeople = (event) => {
    axios.post('/fakes');
  }

  addFakeStories = (event) => {
    axios.post('/fakes/story');
  }
  
  render() {

    return(
      <div>
        <div>
          <button onClick={this.addFakePeople}>Add 300 people to the database</button><br/>
          <button onClick={this.addFakeStories}>Add 30 stories to the database</button>
        </div>
      </div>
    )
  }

}
export default AboutPage;
