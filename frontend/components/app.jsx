import React from 'react';
import {
  Route,
  Switch,
  Link,
  Redirect,
  HashRouter
} from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from '../util/route_util';
import LoginFormContainer from '../components/session_forms/login_form_container';
import SignupFormContainer from '../components/session_forms/signup_form_container';
import PageNotFoundContainer from '../components/splash_and_404/page_not_found_container'
import SplashContainer from '../components/splash_and_404/splash_container';
import HomeContainer from '../components/logged_in/home_container';
import TeamShowContainer from '../components/logged_in/team_show/team_show_container';
import ProjectShowContainer from '../components/logged_in/project_show/project_show_container';
import ProjectCreationFormContainer from './logged_in/project_creation/project_creation_form_container';
import ProjectEditFormContainer from './logged_in/project_edit/project_edit_form_container';
import UserShowContainer from './logged_in/user_show/user_show_container'

const App = () => {
  // debugger
  // let debugEnabler;
  return (
    <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        
        
        <ProtectedRoute exact path="/teams/:teamId" component={TeamShowContainer} />
        <ProtectedRoute exact path="/projects/new" component={ProjectCreationFormContainer} />
        <ProtectedRoute exact path="/projects/edit/:teamId" component={ProjectEditFormContainer} />
        <ProtectedRoute exact path="/projects/:projectId" component={ProjectShowContainer} />
        <ProtectedRoute exact path="/users/:userId" component={UserShowContainer} />
        {/* <ProtectedRoute path="/home" component={HomeContainer} /> */}
        
        {/* Splash Page */}
        {/* <AuthRoute exact path="/" component={SplashContainer} /> */}
        <AuthRoute component={SplashContainer} />
        {/* 404 Not Found Page */}
        {/* <AuthRoute component={PageNotFoundContainer} /> */}
    </Switch>
  );
}
export default App;

