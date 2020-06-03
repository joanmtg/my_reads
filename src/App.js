import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books:books })
      })
  }

  toggleSearchPage = () =>{
    const newValue = !this.state.showSearchPage
    this.setState({ showSearchPage: newValue })
  }

  searchBooks = (query) => {
    BooksAPI.search(query)
      .then((books) => {
        return books
      })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks onHideSearchPage={this.toggleSearchPage} onSearchBooks={this.searchBooks}/>
        ) : (
          <ListBooks books={books} onShowSearchPage={this.toggleSearchPage} />
        )}
      </div>
    )
  }
}

export default BooksApp
