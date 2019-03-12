import React, { Component } from 'react'

export default class ProfileInfo extends Component {
  render() {
    const { registration, handleInputChangeFor } = this.props;

    return (
      <form onSubmit={this.registerUser}>
        <div>
          <label htmlFor="first_name">
            First Name:
              <input
              type="text"
              name="first_name"
              value={registration.first_name}
              onChange={handleInputChangeFor('first_name')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="last_name">
            Last Name:
              <input
              type="text"
              name="last_name"
              value={registration.last_name}
              onChange={handleInputChangeFor('last_name')}
            />
          </label>
        </div>
      </form>
    )
  }
}
