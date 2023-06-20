import Comment from "./comment";
import { Container } from "react-bootstrap";
const CommentsList = (props) => {
  const { comments } = props;
  const commentsList = comments.map((item) => {
    const { date, userName, src, id, message } = item;

    return (
      <Comment
        key={id}
        id={id}
        src={src}
        date={date}
        userName={userName}
        message={message}
      />
    );
  });

  return <Container>{commentsList}</Container>;
};
export default CommentsList;
