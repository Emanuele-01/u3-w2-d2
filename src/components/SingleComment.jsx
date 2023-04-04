import { Badge, ListGroup } from "react-bootstrap";

const SingleComment = props => (
  <ListGroup.Item key={props.comment._id} className="d-flex flex-wrap ">
    <span className="me-auto text-truncate">{props.comment.author}</span>
    <span>
      <Badge variant="dark">{props.comment.rate}</Badge> {props.comment.comment}
    </span>
  </ListGroup.Item>
);

export default SingleComment;
