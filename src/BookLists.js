import React, { Component } from 'react'
import BookList from './BookList';

class BookLists extends Component{ 
  
  render(){
    let bookLists = {}
    this.props.books.forEach((book) => {
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
            <BookList books={bookLists['currentlyReading'] || []} listTitle='Currently Reading'/>
            <BookList books={bookLists['wantToRead'] || []} listTitle='Want To Read'/>
            <BookList books={bookLists['read'] || []} listTitle='Read'/>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BookLists;