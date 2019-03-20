import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//app routes
import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../Home/HomePage';
import Notification from '../Notification/Notification';
import ProfilePage from '../Profile/ProfilePage';
import SearchMain from '../Search/SearchMain';
import NewStoryMain from '../Story/NewStory/NewStoryMain.js';
import ExistingStoryMain from '../Story/ExistingStory/ExistingStoryMain';
import CreateStory from '../Story/CreateStory/CreateStory.js';
import CreateStoryDetail from './../Story/CreateStory/CreateStoryDetail.js';
import CreateStoryChapter from './../Story/CreateStory/CreateStoryChapter.js';
import CreateStoryContributor from './../Story/CreateStory/CreateStoryContributor.js';

//for dev convenience
import FakeData from '../Faker/FakeData';
import ContributorPopup from '../Story/Contributor/ContributorPopup';

//styling imports
import './App.css';
import { Row } from 'antd';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Row>
            <Nav />
          </Row>

          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <ProtectedRoute
              exact path='/notification'
              component={Notification}
            />
            <ProtectedRoute
              exact path='/choose-template'
              component={CreateStory}
            />
            <ProtectedRoute
              exact path='/profile'
              component={ProfilePage}
            />
            <ProtectedRoute
              exact path='/search'
              component={SearchMain}
            />
            <ProtectedRoute
              exact
              path="/home"
              component={HomePage}
            />
            <ProtectedRoute
              exact
              path="/contributor"
              component={ContributorPopup}
            />
            <ProtectedRoute
              exact path='/existing-story/:id'
              component={ExistingStoryMain}
            />
            <ProtectedRoute
              exact path='/existing-story/:id/chapter/:chapterId'
              component={ExistingStoryMain}
            />
            <Route
              exact path='/fake-data'
              component={FakeData}
            />
            <ProtectedRoute
              exact path='/choose-template/detail/'
              component={CreateStoryDetail}
            />
            <ProtectedRoute
              exact path='/choose-template/chapter/'
              component={CreateStoryChapter}
            />
            <ProtectedRoute
              exact path='/choose-template/contributor/'
              component={CreateStoryContributor}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
            {/*  */}
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default connect()(App);
