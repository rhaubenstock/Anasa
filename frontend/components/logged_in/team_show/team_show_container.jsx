import React from 'react';

import { connect } from 'react-redux';

import HomeHeaderContainer from '../home_header_container'
import SidebarContainer from '../sidebar_container';

import {
  updateTeam,
  getTeam 
} from '../../../actions/team_actions';

import TeamShow from './team_show';


const mapStateToProps = (state, ownProps) => {
  const teamId = ownProps.match.params.teamId;
  const team = state.entities.teams[teamId];
  const name = team ? team.name : "Loading Team Name...";
  const description = (team && team.description) ? team.description : "";
  return {
    id: teamId,
    header: <HomeHeaderContainer title="Team Show Page" />,
    sidebar: <SidebarContainer />,
    name,
    description
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const teamId = ownProps.match.params.teamId
  return {
    thunkGetTeam: () => dispatch(getTeam(teamId)),
    thunkUpdateTeam: (team) => dispatch(updateTeam(team))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamShow);