import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import BookLists from './BookLists'

class BooksApp extends React.Component {
  state = {
    books:[],
  }

  constructor(props) {
    super(props);
    this.onChangeShelf = this.onChangeShelf.bind(this);
  }

  findShelf = (books, id) => {
    const book = books.find((b) => (b.id === id))
    return (book && book.shelf) ? book.shelf : 'none'
  }

  onChangeShelf(book, changeShelf){
    BooksAPI.update(book, changeShelf)
    this.setState(prevState => {
      return {
        books: [...prevState.books.filter(b => b.id === book.id ? b.shelf=changeShelf : book)] 
      }
    });
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books)=>{
        this.setState(()=>({
          books
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BookLists 
            books={this.state.books}
            onChangeShelf={this.onChangeShelf}
          />
        )}
        />
        <Route path='/search' render={() => (
          <Search 
            books={this.state.books}
            onChangeShelf={this.onChangeShelf}
            findShelf={this.findShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
