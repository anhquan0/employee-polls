import React, { useState } from 'react';
import { connect } from "react-redux";
import UserCard from "./UserCard";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import PropTypes from "prop-types";
import '../../css/home.css';

const Home = ({ authedUser, users, questions }) => {
  const [value, setValue] = useState("1");

  const unanswered = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const answered = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="home-container">
      <TabContext value={value}>
        <div className="tabs-container">
          <TabList onChange={handleChange} aria-label="Question tabs">
            <Tab label="New Questions" value="1" />
            <Tab label="Done" value="2" />
          </TabList>
        </div>
        <TabPanel value="1">
          <div className="question-grid">
            {questions.filter(unanswered).map((question) => (
              <div key={question.id} className="question-item">
                <UserCard question={question} author={users[question.author]} />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="question-grid">
            {questions.filter(answered).map((question) => (
              <div key={question.id} className="question-item">
                <UserCard question={question} author={users[question.author]} />
              </div>
            ))}
          </div>
        </TabPanel>
      </TabContext>
    </div>
  );  
};

Home.propTypes = {
  authedUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      optionOne: PropTypes.shape({
        votes: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      optionTwo: PropTypes.shape({
        votes: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      author: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  users: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatarURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => b.timestamp - a.timestamp),
  users,
});

export default connect(mapStateToProps)(Home);