import React, { Component } from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResult';
import SubHeader from '../Common/SubHeader';

export default class SearchMain extends Component {
  render() {
    return (
      <div>
        <SubHeader headerText='Notifications' />
        <SearchBar />
        <SearchResults />
      </div>
    )
  }
}
