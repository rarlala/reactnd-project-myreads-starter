import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import { Route } from 'react-router-dom'
import './App.css'
import Search from './Search'
import BookLists from './BookLists'

class BooksApp extends React.Component {
  state = {
    books:[]
  }

  onChangeShelf(book, changeShelf){
    BooksAPI.update(book, changeShelf)
      .then((books) => {
        this.setState(prevState => {
          return {
            books: [...prevState.bookList.filter(b => b.id !== book.id), book] 
          }
        });
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
          <Search />
        )} />
      </div>
    )
  }
}

export default BooksApp
