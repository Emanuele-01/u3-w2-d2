import { Component } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

class CommentArea extends Component {
  state = {
    comments: []
  };

  // componentDidMount ora avverrà al primo montaggio del componente, cioè dopo la prima selezione di una card nella lista
  componentDidMount() {
    console.log("didMount()");

    this.fetchComments();
  }

  // fetchComments viene chiamato in: componentDidMount, componentDidUpdate e anche dopo la post interna ad AddComment
  fetchComments = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJhZThlNTY4MzQzMTAwMTRkZWE3ZWYiLCJpYXQiOjE2ODA1MzM3MzMsImV4cCI6MTY4MTc0MzMzM30.BybWrL_zO0q23jXsrG8pA-yPWXt9QYBf4zZcRNL920U"
        }
      });

      if (response.ok) {
        const commentsArr = await response.json();
        console.log("data retrieved, setState imminent....");
        // setState  accetta una callback come secondo parametro opzionale, che verrà chiamata dopo che lo stato è stato effettivamente aggiornato
        this.setState({ comments: commentsArr }, () => console.log("setState", this.state.comments));
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate()");

    // controllo di guardia per rifare la fetch SOLO SE cambia la prop, non quando c'è un aggiornamento di stato
    if (prevProps.asin !== this.props.asin) {
      // in questo modo la lista dei commenti cambierà nel momento in cui selezioneremo un altra card, perché l'asin sarà cambiato dopo la nuova selezione
      this.fetchComments();
    } else {
      console.log("componentDidUpdate but NO FETCH!");
    }
  }

  componentWillUnmount() {
    console.log("willUnmount()");
  }

  render() {
    console.log("render()");
    return (
      <div>
        {/* la prop fetchComments dà la possibilità ad AddComment di rifare la fetch e ottenere la lista di commenti aggiornati 
         che servirà poi a CommentList qua sotto per ricevere la nuova lista aggiornata, con anche l'ultimo appena inserito */}
        <AddComment asin={this.props.asin} fetchComments={this.fetchComments} />
        <CommentsList comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentArea;
