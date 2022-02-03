import React from 'react';
import AppBar from '@mui/material/AppBar';
//change to functional component
class HomeHeader extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <AppBar position="static">

        <div className="home-header">
          <div className="home-header-main">
            <span className="home-header-title">{this.props.title}</span>
          </div>
          <div className="home-header-buttons">
            <button onClick={this.props.logoutUser}
                    className="home-header-logout"
            >
              Log Out
            </button>
          </div>
        </div>
      </AppBar>

    )
  }
};

export default HomeHeader;