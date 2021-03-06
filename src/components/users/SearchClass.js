import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Search component but as a class
export class Search extends Component {
  state = {
    text: ''
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // We can just use "text: e.target.value" but using [e.target.name] instead can be useful if we have several inputs (name, email...) so we don't have to create multiple onChange functions

  onSubmit = e => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  }; // If we use a regular function instead of an arrow function, submitting would result with an error because this is undefined by default. We would have to explicitly bind "this" to this function so in the form add : onSubmit={this.onSubmit.bind(this)}

  render() {
    const { showClear, clearUsers } = this.props;

    return (
      <div>
        <form className='form' onSubmit={this.onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type='submit'
            className='btn btn-dark btn-block'
            value='Search'
          />
        </form>
        {showClear && (
          <button className='btn btn-light btn-block' onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}
