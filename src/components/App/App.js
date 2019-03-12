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
import NewStoryMain from './../Story/NewStory/NewStoryMain.js';

import './App.css';


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
            <Route
              exact path='/home'
              component={HomePage}
            />
            <Route
              exact path='/notification'
              component={Notification}
            />
            <Route
              exact path='/choose-template'
              component={NewStoryMain}
            />
            <Route
              exact path='/profile'
              component={ProfilePage}
            />
            <Route
              exact path='/search'
              component={Search}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            {/* <ProtectedRoute
              exact
              path="/home"
              component={UserPage} */}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <Route
              exact
              path="/contributor"
              component={ContributorPopup}
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
