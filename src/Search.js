import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

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

  // findShelf = (books, id) => {
  //   const book = books.find((b) => (b.id === id))
  //   return (book && book.shelf) ? book.shelf : 'none'
  // }

  render(){
    const { query, searchResults } = this.state
    const { books, onChangeShelf, findShelf } = this.props

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
              {searchBooks.map((book)=>(
                <li key={book.id}>
                  {console.log(book)}
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks['smallThumbnail']})`}}></div>
                      <div className="book-shelf-changer">
                        <select 
                          onChange={(event)=> onChangeShelf(book, event.target.value)}
                          defaultValue={findShelf(books, book.id)}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
    )
  }
}

export default Search