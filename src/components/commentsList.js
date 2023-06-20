import Comment from "./comment";
import { Container, Row } from "react-bootstrap";
const CommentsList = (props) => {
  const { comments } = props;
  const commentsList = comments.map((item) => {
    const { date, userName, src, id, message } = item;

    return (
      <Row key={id}>
        <Comment
          id={id}
          src={src}
          date={date}
          userName={userName}
          message={message}
        />
      </Row>
    );
  });

  return <Container>{commentsList}</Container>;
};
export default CommentsList;
