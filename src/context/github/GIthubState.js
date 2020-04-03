import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();

    // This, using OAuth credentials in query parameters has been deprecated so it won't work in the future. The way below should work
    // const res = await axios.get(
    //   `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    // );

    const res = await axios({
      baseURL: 'https://api.github.com/search/users',
      auth: {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET
      },
      params: {
        q: text
      }
    });

    dispatch({ type: SEARCH_USERS, data: res.data.items });
  };

  // Get User
  const getUser = async username => {
    setLoading();

    const res = await axios({
      baseURL: `https://api.github.com/users/${username}`,
      auth: {
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET
      }
    });

    dispatch({ type: GET_USER, data: res.data });
  };

  // Get Repos

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // We're wrapping the entire app with the provider that contains the state so that the state is available to the entire app, there's no need to pass the state as props
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
