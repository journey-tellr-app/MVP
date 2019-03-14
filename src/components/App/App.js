import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
// import UserPage from '../UserPage/UserPage';
import HomePage from '../Home/HomePage';
//for use in other components
import ContributorPopup from '../Story/Contributor/ContributorPopup';

import ChooseTemplate from '../Story/NewStory/ChooseTemplate';
import Notification from '../Notification/Notification';
import ProfilePage from '../Profile/ProfilePage';
import Search from '../Search/Search';
import FakeData from '../Faker/FakeData';
import NewStoryMain from '../Story/NewStory/NewStoryMain.js';

import './App.css';
import ExistingStory from '../Story/ExistingStory/ExistingStory';
import LoginPage from '../LoginPage/LoginPage';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              // component={NewStoryMain}
              component={AboutPage}
            />
            <ProtectedRoute
              exact path='/notification'
              component={Notification}
            />
            <ProtectedRoute
              exact path='/choose-template'
              component={NewStoryMain}
            />
            <ProtectedRoute
              exact path='/profile'
              component={ProfilePage}
            />
            <ProtectedRoute
              exact path='/search'
              component={Search}
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
            component={ExistingStory}
            />
            <Route
            exact path='/fake-data'
            component={FakeData} />
            
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
