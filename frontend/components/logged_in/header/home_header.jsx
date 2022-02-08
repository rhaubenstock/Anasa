import React from 'react';
import AppBar from '@mui/material/AppBar';
//change to functional component
class HomeHeader extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      // from https://stackoverflow.com/questions/34550593/how-to-disable-box-shadow-globally-for-all-mui-components#:~:text=In%20the%20configuration%20object%20of,removed%20entirely%20in%20your%20application.
      <AppBar position="static" elevation={0} >

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