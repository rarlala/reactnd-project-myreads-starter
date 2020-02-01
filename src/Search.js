import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp';
import * as BooksAPI from './utils/BooksAPI'
import Books from './Books'

class Search extends Component{
  state = {
    query: '',
    searchResults:[]
  }

  searchQuery = (query) => {
    BooksAPI.search(query, 20)
      .then((result)=>{
        if( query === ''){
          this.setState({ searchResults: [], query: query.trim()})
        }
        this.setState({ searchResults: result, query: query.trim() })
      });
  }

  getShelf = (books, id) => {
    const book = this.props.books.find((b)=>(b.id === id))
    return (book && book.shelf) ? book.shelf : 'none'
  }

  render(){
    const { query, searchResults } = this.state
    const { onChangeShelf } = this.props

    let searchBooks
    if (query.length !== 0) {
      const match = new RegExp(escapeRegExp(query), 'i');
      if (searchResults.length !== 0){
        searchBooks = searchResults.filter((book) => (
          match.test(book.title)
        ))
      }
    } else {
      searchBooks = [];
    }

    return(
      <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input 
                type="text" 
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.searchQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">

            <ol className="books-grid">
              {searchBooks.map((book)=>(
                <li key={book.id}>
                  <Books 
                    book={book}
                    onChangeShelf={onChangeShelf}
                  />
                </li>
              ))
              }                
            </ol>
          </div>
        </div>
    )
  }
}

export default Search