import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../../services/actions/authedUser";
import PropTypes from "prop-types";
import React, { useState } from "react";
import '../../css/header.css'

const Header = ({ dispatch, authedUserId, avatarURL }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onLogout = () => {
    dispatch(handleLogout());
  };

  return (
    <nav className="header">
      <div className="header-logo">
        <span className="header-title" data-testid="heading">
          Employee Polls
        </span>
      </div>
      <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        <svg
          className="fill-current h-5 w-5"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/new">New Poll</Link>
      </div>
      <div className="user-info">
        <img
          src={avatarURL}
          alt="Profile"
          className="user-avatar"
        />
        <span className="username" data-testid="userName">
          {authedUserId}
        </span>
        <button
          onClick={onLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  authedUserId: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
  avatarURL: authedUser.avatarURL,
});

export default connect(mapStateToProps)(Header);