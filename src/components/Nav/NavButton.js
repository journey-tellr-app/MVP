import React, { Component } from 'react';
import SideDrawer from './SideDrawer';

// icons used on this component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './Nav.css';

//adds special icon library
library.add(faBars);

class NavButton extends Component {
    state = {
        visible: false,
    };

    // this causes the nav drawer to appear when called
    handleSideBar = (bool, e) => {
        this.setState({
            visible: bool,
        });
    };

    render() {
        // console.log(this.state);
        return (
            <div className='header-button-div'>
                <FontAwesomeIcon
                    className="drawer-btn"
                    icon="bars"
                    size="2x"
                    onClick={this.handleSideBar.bind(this, true)}
                    visible={toString(this.state.visible)}
                />
                {this.state.visible &&
                    <SideDrawer handleSideBar={this.handleSideBar} visible={this.state.visible} />
                }
            </div>
        )
    }
}

export default NavButton;
