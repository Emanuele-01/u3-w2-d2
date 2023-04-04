
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";
import { useEffect, useState } from "react";

const CommentArea = (props) => {
  // state = {
  //   comments: []
  // };
  const [comments, setComments] = useState([]);

  // componentDidMount ora avverrà al primo montaggio del componente, cioè dopo la prima selezione di una card nella lista
  // fetchComments viene chiamato in: componentDidMount, componentDidUpdate e anche dopo la post interna ad AddComment

  const fetchComments = async () => {
    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" +props.asin, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDJhZThlNTY4MzQzMTAwMTRkZWE3ZWYiLCJpYXQiOjE2ODA1MzM3MzMsImV4cCI6MTY4MTc0MzMzM30.BybWrL_zO0q23jXsrG8pA-yPWXt9QYBf4zZcRNL920U"
        }
      });

      if (response.ok) {
        const commentsArr = await response.json();
        console.log("data retrieved, setState imminent....");
        // setState  accetta una callback come secondo parametro opzionale, che verrà chiamata dopo che lo stato è stato effettivamente aggiornato
        setComments(commentsArr)
      }
    } catch (error) {
      console.log(error);
    }
  };

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(()=> {fetchComments()},[props.asin])


    return (
      <div>
        {/* la prop fetchComments dà la possibilità ad AddComment di rifare la fetch e ottenere la lista di commenti aggiornati 
         che servirà poi a CommentList qua sotto per ricevere la nuova lista aggiornata, con anche l'ultimo appena inserito */}
        <AddComment asin={props.asin} />
        <CommentsList comments={comments} fetchComments={fetchComments}/>
      </div>
    );
}

export default CommentArea;
