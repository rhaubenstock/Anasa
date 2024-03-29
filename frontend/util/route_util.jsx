import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const Auth = ( { component: Component, path, loggedIn, userId, exact }) => (
  <Route {...{path, exact}} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={`/users/${userId}`} />
    )
  )} />
);


const Protected = ( { component: Component, path, loggedIn, exact }) => (
  <Route {...{path, exact}} render={(props) => (
    loggedIn ? (
      <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
  )} />
);

const mapStateToProps = state => (
  { 
    loggedIn: Boolean(state.session.id),
    userId: state.session.id
  }
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));