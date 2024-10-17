import { connect } from "react-redux";
import { Link } from "react-router-dom";
import '../../css/userCard.css';

const UserCard = ({ question, author }) => {
  return (
    <div className="user-card">
      <div className="shrink-0">
        <img
          src={author?.avatarURL}
          alt={author?.name}
        />
      </div>
      <div className="user-info">
        <div className="name">
          {question.author}
        </div>
        <p className="date">
          {new Date(question.timestamp).toDateString()}
        </p>
      </div>
      <Link
        to={`/questions/${question.id}`}
        className="show-button"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M12.293 9.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L15.586 15H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 010-1.414z" />
        </svg>
        <span>Show</span>
      </Link>
    </div>
  );
};

export default connect()(UserCard);