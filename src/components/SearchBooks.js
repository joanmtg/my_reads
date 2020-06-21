import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from '../util/BooksAPI'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {

    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    state = {
        query:'',
        resultBooks: []
    }

    onUpdateBook = (book, shelf) => {
        this.props.onUpdateBook(book, shelf)
        book.shelf = shelf
        this.setState((oldState) => ({
            resultBooks: oldState.resultBooks.filter(b => b.id !== book.id).concat(book)
        }));
    }

    searchBooks = (query) =>{
        const {books} = this.props
        if(query !== ''){
            BooksAPI.search(query)
                .then((foundBooks) =>{
                    if(foundBooks.error){
                        this.setState({resultBooks:[]})
                    }else if (query === this.state.query){
                        let booksWithShelves = foundBooks
                        for (let book of booksWithShelves){
                            const bookWithShelf = books.find( b => b.id === book.id)
                            const shelf = bookWithShelf ? bookWithShelf.shelf : 'none'
                            book.shelf = shelf
                        }
                        this.setState({resultBooks:booksWithShelves})
                    }
                })
        }else{
            this.setState({resultBooks:[]})
        }
    }

    handleChange = (event) =>{
        const query = event.target.value
        this.setState({query:query}, () => {
            this.searchBooks(this.state.query)
        })
    }

    render(){
        const {query, resultBooks} = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link to='/'>
                    <div className="close-search">
                        Close
                    </div>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text"
                           value={query}
                           placeholder="Search by title or author"
                           onChange={this.handleChange}/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {resultBooks && resultBooks.length > 0 &&
                        resultBooks.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdateBook={this.onUpdateBook} />
                        </li>))
                    }
                </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks