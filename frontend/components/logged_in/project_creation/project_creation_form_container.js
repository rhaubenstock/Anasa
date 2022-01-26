import React from 'react';
import { connect } from 'react-redux';

import HomeHeaderContainer from '../header/home_header_container'
import SidebarContainer from '../sidebar/sidebar_container';

import { createProject } from '../../../actions/project_actions';
import { getTeams } from '../../../actions/team_actions';
import ProjectCreationForm from './project_creation_form';
const mapStateToProps = (state) => {
  
  const userId = state.session ? state.session.id : null;
  const user = state.entities.users ? state.entities.users[userId] : null;
  const teamIds = user ? user.teamIds : [];

  const teams = [];
  if(state.entities.teams) {
    teamIds.forEach(id => {
      let team = state.entities.teams[id];
      if(team) teams.push(team);
    });
  }

  return { 
    teams,
    header: <HomeHeaderContainer title="Project Creation Page" />,
    sidebar: <SidebarContainer /> 
  };
};

const mapDispatchToProps = dispatch => {
  return {
    thunkCreateProject: project => dispatch(createProject(project)),
    thunkGetTeams: () => dispatch(getTeams())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreationForm);