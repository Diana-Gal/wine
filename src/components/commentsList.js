import Comment from "./comment";
import { Container, Row } from "react-bootstrap";

const CommentsList = (props) => {
  const comments = props.comments;

  // Sorting the comments array by date in descending order
  const sortedComments = comments.sort((a, b) => {
    const dateA = new Date(
      a.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
    );
    const dateB = new Date(
      b.date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3")
    );
    return dateB - dateA;
  });

  const commentsList = sortedComments.map((item) => {
    const { date, userName, id, userId, message } = item;

    return (
      <Row key={id}>
        <Comment
          id={id}
          date={date}
          userName={userName}
          userId={userId}
          message={message}
          deleteComment={props.deleteComment}
        />
      </Row>
    );
  });

  return <Container id="comments-list">{commentsList}</Container>;
};

export default CommentsList;
