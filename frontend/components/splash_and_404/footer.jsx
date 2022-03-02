import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <footer className="footer">
      {/* <div className="footer-header"> Meet The Developer </div> */}
      <div className="team-spread">
        <div className="member">
          {/* <div className="member-name"> Reed Haubenstock </div> */}
          <ul className="footer-links">
            <li className="user-profile">
              <a target="_blank" href="">
                <div className="footer-img profile-img"></div>
              </a>
            </li>
            <li className="linked-in">
              <a target="_blank" href="https://www.linkedin.com/in/reed-haubenstock-49325995/">
                <div className="footer-img linkedin-img"></div>
              </a>
            </li>
            <li className="github">
              <a target="_blank" href="https://github.com/rhaubenstock/">
                {/* <img className="footer-img" src="assets/github.png" alt="" /> */}
                <div className="footer-img github-img"></div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}