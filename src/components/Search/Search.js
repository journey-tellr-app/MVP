import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import SearchResult from './SearchResult';
import { Menu, Dropdown, Icon } from 'antd';


class Search extends Component {
    state = {
        dropdown: "Search By:"
    }
    setDropdown = (event) => {
        console.log(this.state);
        // console.log(event);
        
        // this.setState({
        //     dropdown: 
        // })
        
    }
    render() {
        const Search = Input.Search;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a value="Author" onClick={this.setDropdown} rel="noopener noreferrer">1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">3rd menu item</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                <h1>Search All Stories</h1>
                <div>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                    <div><Dropdown overlay={menu}>
                        <a className="ant-dropdown-link">
                            {this.state.dropdown} <Icon type="down" />
                        </a>
                    </Dropdown></div>
                    {/* <SearchResult /> */}
                </div>
            </div>
        )
    }
};

export default connect()(Search);