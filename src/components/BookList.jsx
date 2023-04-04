
import SingleBook from "./SingleBook";
import { Alert, Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";
import { useState } from "react";

const BookList = (props) => {
  // state = {
  //   searchQuery: "",
  //   selectedBook: ""
  // };
// eslint-disable-next-line no-unused-vars
const [searchQuery, setSearchQuery] = useState(' ');
// eslint-disable-next-line no-unused-vars
const [selectedBook, setSelectedBook] = useState(' ')
  // questa funzione è passata a SingleBook come prop, cosicché la possa chiamare internamente al click della card, per salvare il riferimento ASIN della card cliccata
  const changeSelectedBook = asin => {
    setSelectedBook(asin);
  };


    return (
      <>
        <Row>
          <Col>
            {/* Input controllato, serve a salvare la stringa per la quale si filtrano i libri (vedi metodo filter() usato in basso) */}
            <Form.Group className="mb-3">
              <Form.Label className="display-6">Search a book</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search here"
                // leggo lo stato
                value={searchQuery}
                // setto lo stato ad ogni lettera inserita nell'input
                onChange={e => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Row>
              {props.books
                .filter(b => b.title.toLowerCase().includes(searchQuery)) // se searchQuery è "" il filter ritorna tutto l'array così com'è,
                // se ha un valore !== "", il filter ritornerà solo gli elementi che includono i caratteri presenti nel this.state.searchQuery in quel momento
                .map(b => (
                  <Col xs={12} md={3} key={b.asin}>
                    <SingleBook
                      book={b} // b è l'oggetto libro vero e proprio passato come prop e accessibile all'interno di SingleBook come this.props.book
                      selectedBook={selectedBook} // selectedBook è l'ASIN passato come prop che verrà usato per determinare quale card si colorerà il bordo di rosso
                      changeSelectedBook={changeSelectedBook} // changeSelectedBook è la funzione chiamata all'onClick della Card interna a SingleBook
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col md={6}>
            {selectedBook ? (
              // CommentArea sarà visibile solo dopo aver selezionato un libro, ovvero solo dopo che lo stato selectedBook cambia da "" all'ASIN di un libro
              <CommentArea asin={selectedBook} />
            ) : (
              // nel frattempo si visualizza un alert
              <Alert variant="info">Seleziona un libro per visualizzare i commenti</Alert>
            )}
          </Col>
        </Row>
      </>
    );
}

export default BookList;
