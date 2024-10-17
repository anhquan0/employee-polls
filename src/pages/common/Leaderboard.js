import React from 'react';
import { connect } from "react-redux";
import '../../css/leaderboard.css';

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">{user.name[0]}</div>
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <br />
                      <span className="user-id">{user.id}</span>
                    </div>
                  </div>
                </td>
                <td className="score">
                  {Object.keys(user.answers).length}
                </td>
                <td className="score">
                  {user.questions.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length),
});

export default connect(mapStateToProps)(Leaderboard);