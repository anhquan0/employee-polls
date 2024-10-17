import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleAddAnswer } from '../../services/actions/questions';
import '../../css/poll.css';

const Poll = ({ dispatch, authedUser, users, questions }) => {
  const [isVotedOne, setIsVotedOne] = useState(false);
  const [isVotedTwo, setIsVotedTwo] = useState(false);
  const [question, setQuestion] = useState({});
  const [author, setAuthor] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const ques = Object.values(questions).find((ques) => ques.id === id);
    if (ques) {
      setAuthor(users[ques.author]);
      setQuestion(ques);
      setIsVotedOne(ques.optionOne.votes.includes(authedUser.id));
      setIsVotedTwo(ques.optionTwo.votes.includes(authedUser.id));
    }
    if (!authedUser || !ques) {
      navigate("/404");
    }
  }, [authedUser, questions, users, id, navigate]);

  const choiseAnswer = (e, option) => {
    e.preventDefault();
    dispatch(
      handleAddAnswer(question.id, option === "1" ? "optionOne" : "optionTwo")
    );
  };

  const calcVote = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    return (
      ((question[option].votes.length / numberVotesTotal) * 100).toFixed(2) +
      "%"
    );
  };

  return (
    <div className="poll-container">
      {question && author && (
        <div className="poll-card">
          <h1 className="poll-title">
            Poll by {author.id}
          </h1>
          <div className="author-avatar">
            <img
              src={author.avatarURL}
              alt="Profile"
            />
          </div>
          <h2 className="poll-question">
            Would you rather?
          </h2>
          <div className="poll-options">
            <div
              className={`poll-option ${
                isVotedOne ? "voted" : "not-voted"
              }`}
            >
              <p className="option-text">{question.optionOne.text}</p>
              {!isVotedOne && !isVotedTwo && (
                <button
                  className="vote-button"
                  onClick={(e) => choiseAnswer(e, "1")}
                >
                  Vote
                </button>
              )}
              {(isVotedOne || isVotedTwo) && (
                <p className="vote-results">
                  Votes: {question.optionOne.votes.length} (
                  {calcVote("optionOne", question)})
                </p>
              )}
            </div>
            <div
              className={`poll-option ${
                isVotedTwo ? "voted" : "not-voted"
              }`}
            >
              <p className="option-text">{question.optionTwo.text}</p>
              {!isVotedOne && !isVotedTwo && (
                <button
                  className="vote-button"
                  onClick={(e) => choiseAnswer(e, "2")}
                >
                  Vote
                </button>
              )}
              {(isVotedOne || isVotedTwo) && (
                <p className="vote-results">
                  Votes: {question.optionTwo.votes.length} (
                  {calcVote("optionTwo", question)})
                </p>
              )}
            </div>
          </div>
          <div className="back-to-home">
            <Link
              to="/"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  return { authedUser, users, questions };
};

export default connect(mapStateToProps)(Poll);