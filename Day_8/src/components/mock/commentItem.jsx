import { useState } from "react";

function CommentItem({ author, avatar, date, text}) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className="ui container comments">
    <div className="comment">
      {avatar && (
        <a className="avatar">
          <img src={avatar} alt={author} />
        </a>
      )}
      <div className="content">
        {author && <a className="author">{author}</a>}
        {date && (
          <div className="metadata">
            <span className="date">{date} | Likes :</span>
            <strong>{likes}</strong>
          </div>
        )}
        {text && <div className="text">{text}</div>}
          <button onClick={handleLike}>
            Click Me
          </button>
      </div>
    </div>
    </div>
  );
}

export default CommentItem;
