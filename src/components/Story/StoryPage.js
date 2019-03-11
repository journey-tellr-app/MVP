import React, { Component } from 'react';
import { connect } from 'react-redux';

class StoryPage extends Component {

    render() {
        return (
            <div>
                <h1>Nav Bar Header</h1>
                
            </div>
        )
    }

}

mapStoreToProps = reduxStore ({
    reduxStore,
});

export default connect(maptoreToProps)(StoryPage);