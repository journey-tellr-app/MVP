import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Typography } from 'antd';
import ResultListItem from './ResultListItem';


class SearchResult extends Component {
    render() {
        const { searchResults } = this.props;

        return (
            <div>
                {searchResults.length > 0 ?
                <div>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 2,
                            hideOnSinglePage: true,
                            style: {marginTop: 0, marginBottom: 20}
                        }}
                        dataSource={searchResults}
                        renderItem={item => (
                            <ResultListItem item={item} />
                        )}
                    />
                </div>
                :
                <div>
                    <Typography align='center'>
                        Your search results will appear here.
                    </Typography>
                </div>
                }

            </div>
        )
    }
};

const mapStateToProps = (rs) => ({
    searchResults: rs.searchResults,
});

export default connect(mapStateToProps)(SearchResult);