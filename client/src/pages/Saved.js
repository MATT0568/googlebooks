import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    books: []
  };

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log(res.data)
        this.setState({ books: res.data })
      }
      )
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.loadBooks();
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <div>
                <Row>
                  <Col size="md-12">
                    <h3>
                      Saved Books:
                    </h3>
                    {this.state.books.map(book => (
                      <div className="border border-primary" key={book._id}>
                        <Row>
                          <Col size="md-12">
                            <h3>
                              {book.title}
                            </h3>
                          </Col>
                          <br />
                          <Col size="md-12">
                            <strong>
                              Written By {book.authors.map((author, index) => ((index ? ', ' : '') + author))}
                            </strong>
                          </Col>
                          <br />
                          <br />
                          <Col size="md-2">
                            <img className="image" src={book.image} alt={book.title} />
                          </Col>
                          <Col size="md-9">
                            <strong className="description">
                              {book.description}
                            </strong>
                          </Col>
                          <Col size="md-8"></Col>
                          <Col size="md-1">
                            <a className="view-btn" href={book.link} role="button" tabIndex="0">View</a>
                          </Col>
                          <Col size="md-1">
                            <a className="delete-btn" role="button" tabIndex="0" onClick={() => this.deleteBook(book._id)}>Delete</a>
                          </Col>
                          <Col size="md-12"><p> </p></Col>
                        </Row>
                      </div>
                    ))}
                  </Col>
                </Row>
              </div>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
