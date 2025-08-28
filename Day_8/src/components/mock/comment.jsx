import { Component } from "react";
import { faker } from '@faker-js/faker';
import CommentItem from "./commentItem.jsx";
import ReplyForm from "./replyForm.jsx";

// function formatDate(date) {
//   const now = new Date();
//   const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24)); 
//   const hours = date.getHours();
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   const ampm = hours >= 12 ? "PM" : "AM";
//   const hour12 = hours % 12 || 12;

//   if (diff === 0) return `Today at ${hour12}:${minutes} ${ampm}`;
//   if (diff === 1) return `Yesterday at ${hour12}:${minutes} ${ampm}`;
//   if (diff < 7) return `${diff} days ago at ${hour12}:${minutes} ${ampm}`;
//   return date.toLocaleDateString(); 
// }

class DateFormatter {
  static format(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24)); // selisih hari
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;

    if (diff === 0) return `Today at ${hour12}:${minutes} ${ampm}`;
    if (diff === 1) return `Yesterday at ${hour12}:${minutes} ${ampm}`;
    if (diff < 7) return `${diff} days ago at ${hour12}:${minutes} ${ampm}`;
    return date.toLocaleDateString();
  }
}

// function Comment() {
//   const comments = Array.from({ length: 10 }, () => {
//     const randomDate = faker.date.recent(7); 
//     return {
//       author: faker.person.fullName(),
//       avatar: faker.image.avatar(),
//       date: formatDate(randomDate),
//       text: faker.lorem.sentence()
//     };
//   });

//   const getSizeClass = (count) => {
//     if (count <= 4) return "large";
//     if (count <= 7) return "medium";
//     return "small";
//   };

//   const sizeClass = getSizeClass(comments.length);

//   return (
//     <div className="ui container comments">
//       <h3 className="ui dividing header">Comments ({comments.length})</h3>
      
//       <div className={`ui ${sizeClass} comments`}>
//         {comments.map((c, idx) => (
//           <CommentItem
//             key={idx}
//             author={c.author}
//             avatar={c.avatar}
//             date={c.date}
//             text={c.text}
//             size={sizeClass}
//           />
//         ))}
//       </div>

//       <ReplyForm />
//     </div>
//   );
// }

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: Array.from({ length: 5 }, () => {
        const randomDate = faker.date.recent(7);
        return {
          author: faker.person.fullName(),
          avatar: faker.image.avatar(),
          date: DateFormatter.format(randomDate),
          text: faker.lorem.sentence()
        };
      }),
      currentTime: new Date().toLocaleTimeString()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        currentTime: new Date().toLocaleTimeString()
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { comments, currentTime } = this.state;

    return (
      <div className="ui container comments">
        <h3 className="ui dividing header">Comments</h3>
        <h3> {currentTime} </h3>

        {comments.map((c, idx) => (
          <CommentItem
            key={idx}
            author={c.author}
            avatar={c.avatar}
            date={c.date}
            text={c.text}
          />
        ))}

        <ReplyForm />
      </div>
    );
  }
}

  
export default Comment;
