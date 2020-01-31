import React, { Component } from 'react';
import Books from './Books';

class BookList extends Component{
  render(){
    const { books, listTitle } = this.props
    
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{listTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {books.map((book)=>(
            <li key={book.id}>
              <Books book={book}/>
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookList;