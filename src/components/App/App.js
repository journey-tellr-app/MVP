import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  Link,
} from 'react-router-dom';

//app routes
import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../Home/HomePage';
import Notification from '../Notification/Notification';
import ProfilePage from '../Profile/ProfilePage';
import SearchMain from '../Search/SearchMain';
import ExistingStoryMain from '../Story/ExistingStory/ExistingStoryMain';
import CreateStoryMain from '../Story/CreateStory/CreateStoryMain.js';
import CreateStoryDetail from './../Story/CreateStory/CreateStoryDetail.js';
import CreateStoryChapter from './../Story/CreateStory/CreateStoryChapter.js';
import CreateStoryContributor from './../Story/CreateStory/CreateStoryContributor.js';
import NavButton from '../Nav/NavButton';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//for dev convenience
import FakeData from '../Faker/FakeData';
import ContributorPopup from '../Story/Contributor/ContributorPopup';

//styling imports
import { Icon, Row, Col, BackTop } from "antd";
import './App.css';
import '../Nav/Nav.css';


class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    // console.log('in ap render');
    let journeyTellrLogo = './images/kevinslogos/JourneyTellr-Nameonly-color-noR.png'
    return (
      <Router>
        <div>
          {/* do NOT refactor out: this is the header, it is sourced in this file due to issues arising with navgationlink conditional rendering causing header to rerender */}
          <Row type="flex" justify="center" align='middle' className='nav'>
            <Col span={3}>
              {this.props.user.id !== undefined ?
                <NavButton />
                :
                <div className='header-button-div'>
                  <Link to="/about" >
                    <Icon type='info-circle' theme='twoTone' twoToneColor='#D98A4F' style={{ fontSize: '24px' }} />
                  </Link>
                </div>
              }
            </Col>
            <Col span={18}>
              <Link to="/home">
                <img src={journeyTellrLogo}
                  alt={'logo'}
                  className="logo" />
              </Link>
            </Col>
            <Col span={3} />
          </Row>
          {/* end header */}
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
              component={CreateStoryMain}
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
          <BackTop />
        </div>
      </Router>
    )
  }
}

const mapRStoProps = (rs) => {
  return { user: rs.user.userInfo }
}

export default connect(mapRStoProps)(App);