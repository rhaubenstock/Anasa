import React from 'react';

import { connect } from 'react-redux';

import UserShow from "./user_show";
import HomeHeaderContainer from '../header/home_header_container'
import SidebarContainer from '../sidebar/sidebar_container';
import UserTaskContainer from './user_tasks/user_tasks_container';

import {
  getUser,
  updateUser
} from '../../../actions/user_actions';

const mapStateToProps = (state, ownProps) => {
  // make use of userId param from route here

  const userId = parseInt(ownProps.match.params.userId);
  const currentUserId = state.session ? state.session.id : null;
  const canEdit = currentUserId === userId;
  const user = state.entities.users ? state.entities.users[userId] : null;

  const name = user ? `${user.email}'s Page` : "User Profile Page";
  const tasks = user ? <UserTaskContainer id={user.id} editable={canEdit} /> : null;
  
  return { user,
           header: <HomeHeaderContainer title="User Profile Page" />,
           sidebar: <SidebarContainer />,
           tasks,
           name,
           canEdit,
           currentUserId
   };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // add user api util, actions, reducer on frontend
  // add user controller get description on backend and make way to modify description
  // const canEdit = state.entities.session.id === userId;
  // if(canEdit){
  const userId = parseInt(ownProps.match.params.userId);
    return {
      thunkGetUser: () => dispatch(getUser(userId)),
      thunkUpdateUser: (user) => dispatch(updateUser(user)),
    };
  // } else{
  //   return {
  //     thunkGetUser: () => dispatch(getUser(userId))
  //   }
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);