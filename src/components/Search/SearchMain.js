import React, { Component } from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResult';

export default class SearchMain extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <br />
        <SearchResults />
      </div>
    )
  }
}
