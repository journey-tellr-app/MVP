import React, { Component } from 'react';
const faker = require('faker');

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

//DION: I'm using this page to experiment with faker.js

class AboutPage extends Component {
  

  render() {
  
    const User = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      website: faker.internet.url(),
      address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
      bio: faker.lorem.sentences(),
      image: faker.image.avatar()
    }

    return(
      <div>
        <div>
          <p>
            name: {User.name}
            <br/>
            email: {User.email}
            <br/>
            website: {User.website}
            <br/>
            address: {User.address}
            <br/>
            image: <img src={User.image} />
          </p>
        </div>
      </div>
    )
  }

}
export default AboutPage;
