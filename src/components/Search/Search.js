import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import SearchResult from './SearchResult';
import { Select } from 'antd';


class Search extends Component {
    state = {
        dropdown: "AUTHOR",
        results: [],
    }
    handleChange = (value) => {
        // console.log(value);
       // console.log(this.state);
        this.setState({
            dropdown: `${value}`
        })
    }
    sendSearch = (event) => {
    const action = {
                    type: `GET_SEARCH_STORIES_${this.state.dropdown}`,
                    payload: event
    };
    this.props.dispatch(action);
    if (this.state.results.length === 0) {
        console.log('hey', this.state.results);
        
        setInterval(() => {
        this.setState({
            results: this.props.searchResults
        });
        }, 1000);
    }
    
    }
    render() {
        const Search = Input.Search;
        const Option = Select.Option;
        // const menu = (
        //     //Note: Change dropdown to design that doesn't use anchor tags.
        //     <Menu>
        //         <Menu.Item>
        //             <a value="Author"  onClick={value => this.setDropdown(value)} rel="noopener noreferrer">Author</a>
        //         </Menu.Item>
        //         <Menu.Item>
        //             <a target="_blank" rel="noopener noreferrer">Contributer</a>
        //         </Menu.Item>
        //         <Menu.Item>
        //             <a target="_blank" rel="noopener noreferrer">Title</a>
        //         </Menu.Item>
        //     </Menu>
        // );
        return (
            <div>
                <h1>Search All Stories</h1>
                <div>
                    <Search
                        placeholder="input search text"
                        onSearch={value => this.sendSearch(value)}
                        style={{ width: 200 }}
                    />
                    <div>
                        <Select defaultValue="Search By: Author" style={{ width: 160 }} onChange={this.handleChange}>
                            <Option value="AUTHOR" >Author</Option>
                            <Option value="TITLE">Title</Option>
                            <Option value="DESCRIPTION">Description</Option>
                        </Select>
                    </div>
                    {this.state.results.length !== 0 && <SearchResult results={this.state.results.searchResults} />}           
                    </div>
            </div>
        )
    }
};
const mapStateToProps = (rs) => ({
    searchResults: rs.searchResults,
});

export default connect(mapStateToProps)(Search);