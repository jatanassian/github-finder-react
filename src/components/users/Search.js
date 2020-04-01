import React, { Component } from 'react';

export class Search extends Component {
  state = {
    text: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // We can just use "text: e.target.value" but using [e.target.name] instead can be useful if we have several inputs (name, email...) so we don't have to create multiple onChange functions

  onSubmit = e => {
    e.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: '' });
  }; // If we use a regular function instead of an arrow function, submitting would result with an error because this is undefined by default. We would have to explicitly bind "this" to this function so in the form add : onSubmit={this.onSubmit.bind(this)}

  render() {
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
      </div>
    );
  }
}

export default Search;
