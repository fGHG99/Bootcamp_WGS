function CommentItem({ author, avatar, date, text }) {
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
            <span className="date">{date}</span>
          </div>
        )}
        {text && <div className="text">{text}</div>}
      </div>
    </div>
    </div>
  );
}

export default CommentItem;
