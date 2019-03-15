import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import SearchResult from './SearchResult';
import { Menu, Dropdown, Icon } from 'antd';


class Search extends Component {
    state = {
        dropdown: "AUTHOR",
        results: [],
    }
    setDropdown = (event) => {
        console.log(event);
        // console.log(event);
        
        // this.setState({
        //     dropdown: event
        // })
    }
    sendSearch = (event) => {
    const action = {
                    type: `GET_SEARCH_STORIES_${this.state.dropdown}`,
                    payload: event
    };
    this.props.dispatch(action);
    console.log('!!!!!!!', this.props.searchResults);
        console.log(this.props.searchResults.length);
        setInterval(() => {
            this.setState({
                results: this.props.searchResults
            });
        }, 3000);
    }
    test = ()=> {
        if (this.props.searchResults.length !== undefined) {
            console.log(this.props.searchResults.length);
            
           return <h1>Hi</h1> 
        } 
    }
    render() {
        console.log(this.props.searchResults.length);
        const Search = Input.Search;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a value="Author" onClick={value => this.setDropdown(value)} rel="noopener noreferrer">Author</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">Contributer</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">Title</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <h1>Search All Stories</h1>
                <div>
                    <Search
                        placeholder="input search text"
                        onSearch={value => this.sendSearch(value)}
                        style={{ width: 200 }}
                    />
                    <div><Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            Search By: {this.state.dropdown} <Icon type="down" />
                        </a>
                    </Dropdown></div>
                    {/* {JSON.stringify(this.state.results)} */}
                    {this.state.results.length !== 0 && <SearchResult />}           
                    </div>
            </div>
        )
    }
};
const mapStateToProps = (rs) => ({
    searchResults: rs.searchResults,
});

export default connect(mapStateToProps)(Search);