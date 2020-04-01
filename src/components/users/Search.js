import React, { Component } from 'react';

export class Search extends Component {
  state = {
    text: ''
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // We can just use "text: e.target.value" but using [e.target.name] instead can be useful if we have several inputs (name, email...) so we don't have to create multiple onChange functions

  render() {
    return (
      <div>
        <form className='form'>
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
