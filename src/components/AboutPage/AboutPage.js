import React, { Component } from 'react';
const axios = require('axios');

class AboutPage extends Component {

  add300 = (event) => {
    axios.post('/fakes');
  }
  
  render() {

    return(
      <div>
        <div>
          <h1>Be careful with this button y'all!</h1>
          <button onClick={this.add300}>Add 300 people to the database</button>
        </div>
      </div>
    )
  }

}
export default AboutPage;
