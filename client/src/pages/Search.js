import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input } from "../components/Form";

class Books extends Component {
  state = {
    books: []
  };

  loadBooks = query => {
    API.searchBooks(query)
      .then(res => this.setState({ books: res.data.items }))
      .catch(err => console.log(err));
  };

  saveBook = (authors, title, link, image, description) => {
    API.saveBook({
      authors: authors,
      title: title,
      link: link,
      image: image,
      description: description
    })
    .catch(err => console.log(err));
  };


  // loadBooks = (name) => {
  //   API.searchBooks(name)
  //     .then(res => {
  //       this.setState({ books: res.data, title: "", author: "", synopsis: "" })
  //       console.log(res.data)
  //     }
  //     )
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>React Google Books Search</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <a className="search-btn" disabled={!(this.state.title)} onClick={() => this.loadBooks(this.state.title)}>
                Search
              </a>
            </form>
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
          {this.state.books.length ? (
              <div>
                <Row>
                  <Col size="md-12">
                    <h3>
                      Results
                        </h3>
                    {this.state.books.map(book => (
                      <div className="border border-primary" key={book.id}>
                        <Row>
                          <Col size="md-10">
                            <h3>
                              {book.volumeInfo.title}
                            </h3>
                          </Col>
                          <br />
                          <Col size="md-12">
                            <strong>
                              Written By {book.volumeInfo.authors.map((author, index) => ((index ? ', ' : '') + author))}
                            </strong>
                          </Col>
                          <br />
                          <br />
                          <Col size="md-2">
                            <img className="image" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                          </Col>
                          <Col size="md-9">
                            <strong className="description">
                              {book.volumeInfo.description}
                            </strong>
                          </Col>
                          <Col size="md-8"></Col>
                          <Col size="md-1">
                          <a className="view-btn" href={book.volumeInfo.previewLink} role="button" tabIndex="0">View</a>
                          </Col>
                          <Col size="md-1">
                          <a className="delete-btn" role="button" tabIndex="0" onClick={() => this.saveBook(book.volumeInfo.authors, book.volumeInfo.title, book.volumeInfo.previewLink, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.description)}>Save</a>
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

export default Books;
