import React, { useState } from 'react';
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { handleLogin } from "../../services/actions/authedUser";
import PropTypes from "prop-types";
import '../../css/login.css';

const users = [
  { id: "quanlna1", name: "Quan Le Ngoc Anh", password: "1234567" },
  { id: "hiennt260", name: "Hien Nguyen Thuy", password: "1234567" },
  { id: "johndoe", name: "John Doe", password: "123123" },
  { id: "zoshikanlu", name: "Zenobia Oshikanlu", password: "pass246" },
];

const Login = ({ dispatch, loggedIn }) => {
  const [selectedUser, setSelectedUser] = useState(users[0]);

  if (loggedIn) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get("redirectTo");
    return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
  }

  const handleUserChange = (e) => {
    const user = users.find((u) => u.id === e.target.value);
    setSelectedUser(user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser.id || !selectedUser.password) {
      alert("Please select a user!");
      return;
    }
    dispatch(handleLogin(selectedUser.id, selectedUser.password));
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading" data-testid="login-heading">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <select
            className="user-select"
            value={selectedUser.id}
            onChange={handleUserChange}
            data-testid="user-select"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="submit" className="login-button" data-testid="loginBtn">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(Login);