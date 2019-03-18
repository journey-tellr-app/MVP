import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';
import ResultListItem from './ResultListItem';


class SearchResult extends Component {
    render() {
        const { searchResults } = this.props;
                
        return (
            <div>
                {searchResults &&
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={searchResults}
                        renderItem={item => (
                            <ResultListItem item={item} />
                        )}
                    />
                }

            </div>
        )
    }
};

const mapStateToProps = (rs) => ({
    searchResults: rs.searchResults,
});

export default connect(mapStateToProps)(SearchResult);