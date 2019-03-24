import React, { Component } from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResult';
import SubHeader from '../Common/SubHeader';
import { Col, Row } from 'antd';

export default class SearchMain extends Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={24}>
            <SubHeader headerText='Browse Stories' />
          </Col>
          <Col span={18}>
            <SearchBar />
          </Col>
          <Col span={24}>
            <SearchResults />
          </Col>
        </Row>
      </div>
    )
  }
}
