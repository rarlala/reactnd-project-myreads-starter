import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList';

class BookLists extends Component{ 
  
  render(){
    let bookLists = {}
    const {books, onChangeShelf}= this.props
    books.forEach((book) => {
      bookLists[book.shelf] = bookLists[book.shelf] || [];
      bookLists[book.shelf].push(book);
    });

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookList
              books={bookLists['currentlyReading'] || []}
              listTitle='Currently Reading'
              onChangeShelf={onChangeShelf}
            />
            <BookList 
              books={bookLists['wantToRead'] || []} 
              listTitle='Want To Read'
              onChangeShelf={onChangeShelf}
            />
            <BookList 
              books={bookLists['read'] || []} 
              listTitle='Read'
              onChangeShelf={onChangeShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            <button 
              onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default BookLists;