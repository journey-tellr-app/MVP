import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileEdit extends Component {
    constructor(props) {
        super(props)
        this.state = { isHidden: true };
    }


    handleShowEditField = () => {
        this.setState({
            visible: true,
        });
    };

    handleShowStatic = () => {

    }
    render() {
        const isHidden = this.state.isHidden;
        return (
            <div>
                <h1>Profile Edit</h1>
                <h3 isHidden={this.state.isHidden}>Goodbye, world!</h3>
                <h3>Hello, world!</h3>
            </div>
        )
    }

}

const mapStateToProps = reduxStore => ({
    reduxStore
});

export default connect(mapStateToProps)(ProfileEdit);