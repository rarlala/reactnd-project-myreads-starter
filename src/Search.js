import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
          this.setState({ searchResults: [], query: query})
        }
        this.setState({ searchResults: result, query: query })
      });
  }

  getShelf = (books, id) => {
    const book = this.props.books.find((b)=>(b.id === id))
    return (book && book.shelf) ? book.shelf : 'none'
  }

  render(){
    const { query, searchResults } = this.state
    const { onChangeShelf } = this.props

    let searchBooks = []
    if (query) {
      const match = new RegExp(query, 'i');
      if(searchResults.length){
        searchBooks = searchResults.filter((book) => (
          match.test(book.title)
      ))}
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
               { (searchBooks) ? (
                searchBooks.map((book)=>(
                  <li key={book.id}>
                    <Books 
                      book={book}
                      onChangeShelf={onChangeShelf}
                    />
                  </li>
              ))) : 'No Data'
              }                
            </ol>
          </div>
        </div>
    )
  }
}

export default Search