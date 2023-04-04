import { Component } from "react";
import { Button, Form } from "react-bootstrap";

class AddComment extends Component {
  state = {
    commentObj: {
      comment: "",
      rate: "1",
      elementId: this.props.asin
    }
  };

  sendComment = async e => {
    e.preventDefault();

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        body: JSON.stringify(this.state.commentObj),
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJhZThlNTY4MzQzMTAwMTRkZWE3ZWYiLCJpYXQiOjE2ODA1MzM3MzMsImV4cCI6MTY4MTc0MzMzM30.BybWrL_zO0q23jXsrG8pA-yPWXt9QYBf4zZcRNL920U"
        }
      });
      if (response.ok) {
        // alert("Commento inviato");

        // ricrea la lista di commenti nel livello superiore (il padre: CommentArea)
        // attraverso la referenza della funzione fetchComments passata come prop a questo componente
        this.props.fetchComments();

        // resetta i campi (svuotarli)
        this.setState({
          commentObj: {
            comment: "",
            rate: "1",
            elementId: this.props.asin
          }
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <Form onSubmit={this.sendComment}>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Commento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Inserisci il commento"
            value={this.state.commentObj.comment}
            onChange={e => this.setState({ commentObj: { ...this.state.commentObj, comment: e.target.value } })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="comment">
          <Form.Label>Voto</Form.Label>
          <Form.Select
            value={this.state.commentObj.rate}
            onChange={e => {
              this.setState({
                commentObj: {
                  ...this.state.commentObj,
                  rate: e.target.value
                }
              });
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">
          Invia commento
        </Button>
      </Form>
    );
  }
}

export default AddComment;
