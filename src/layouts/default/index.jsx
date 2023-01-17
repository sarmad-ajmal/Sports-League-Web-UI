import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

import "./index.scss";

const DefaultLayout = (props) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">{props.children}</div>
      <Footer />
    </div>
  );
};
export default DefaultLayout;

const Navbar = React.memo(() => {
  return (
    <div className="navbar">
      <div className="logo">
        <Link to={ROUTES.home}>
          <img src="./Images/logo.svg" alt="" />
        </Link>
      </div>
      <div className="nav-items">
        <Link to={ROUTES.home}>
          <span>
            <img src="./Images/schedule.png" alt="" />
            Schedule
          </span>
        </Link>
        <Link to={ROUTES.leaderboard}>
          <span>
            <img src="./Images/leaderboard.png" alt="" />
            Leaderboard
          </span>
        </Link>
      </div>
    </div>
  );
});

const Footer = React.memo(() => {
  return (
    <div className="footer">
      <div className="api-version">API Version: 1.0</div>
    </div>
  );
});
