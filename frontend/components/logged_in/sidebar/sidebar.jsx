import React from 'react';
import { Link } from 'react-router-dom';
import TeamCreateShowContainer from './team_create/team_create_form_container';
import Drawer from '@material-ui/core/Typography'
import { styled, useTheme } from '@mui/material/styles';

class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.thunkGetTeams();
  }

  render(){
    // reference: https://mui.com/components/drawers/#PersistentDrawerRight.js
    // const DrawerHeader = styled('div')(({ theme }) => ({
    //   display: 'flex',
    //   alignItems: 'center',
    //   padding: theme.spacing(0, 1),
    //   // necessary for content to be below app bar
    //   ...theme.mixins.toolbar,
    //   justifyContent: 'flex-end',
    // }));

    return (
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* {DrawerHeader} */}
        <div className="home-sidebar">
          <div className="home-sidebar-header">
              <Link to="/home" className="home-logo-container">
                <div className="home-logo">
                  <h5>anasa</h5>
                </div>
              </Link>
          </div>
          <div className="home-sidebar-teams">
            {this.props.teams.map( team => (
              <Link to={`/teams/${team.id}`} key={team.id}>
                <span>{team.name}</span>
              </Link>
            ))}
          </div>
          <TeamCreateShowContainer />
        </div>
      </Drawer>
    )
  }
};

export default Sidebar;