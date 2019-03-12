import React, { Component } from 'react';
import ImageUpload from '../ImageUpload/ImageUpload';
const axios = require('axios');

class ProfilePage extends Component {

    render() {

        return (
            <div>
                <div>
                    <ImageUpload />
                </div>
            </div>
        )
    }

}
export default ProfilePage;
