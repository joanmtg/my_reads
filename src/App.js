import React from 'react'
import * as BooksAPI from './util/BooksAPI'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    this.fetchBooks()
  }

  componentDidUpdate(prevProps, prevState){
    if(JSON.stringify(prevState.books) !== JSON.stringify(this.state.books)){
      this.fetchBooks()
    }
  }

  fetchBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books:books })
      })
  }

  toggleSearchPage = () =>{
    const newValue = !this.state.showSearchPage
    this.setState({ showSearchPage: newValue })
  }

  onUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(()=>{
        book.shelf = shelf
        this.setState((oldState) => ({
          books: oldState.books.filter(b => b.id !== book.id).concat(book),
        }));
      })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            onUpdateBook={this.onUpdateBook} />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
              books={books}
            onUpdateBook={this.onUpdateBook}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
