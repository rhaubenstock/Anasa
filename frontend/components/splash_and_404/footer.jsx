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
                <img className="footer-img" src="assets/profile.png" alt="" />
              </a>
            </li>
            <li className="linked-in">
              <a target="_blank" href="https://www.linkedin.com/in/reed-haubenstock-49325995/">
                <img className="footer-img" src="assets/linkedin.png" alt="" />
              </a>
            </li>
            <li className="github">
              <a target="_blank" href="https://github.com/rhaubenstock/">
                <img className="footer-img" src="assets/github.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}