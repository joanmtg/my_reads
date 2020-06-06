import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from '../util/BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends Component {

    static propTypes = {
        onHideSearchPage: PropTypes.func.isRequired,
        onUpdateBook: PropTypes.func.isRequired
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
        if(query !== ''){
            BooksAPI.search(query)
                .then((books) =>{
                    if(!books.hasOwnProperty('error')){
                        let booksWithShelves = books
                        for (let book of booksWithShelves){
                            BooksAPI.get(book.id)
                            .then((bookWithShelf) =>{
                                book.shelf = bookWithShelf.shelf
                            })
                        }
                        setTimeout(() => { this.setState({resultBooks:booksWithShelves}) }, 1000)

                    }else{
                        this.setState({resultBooks:[]})
                    }
                })
        }else{
            this.setState({resultBooks:[]})
        }
    }

    handleChange = (event) =>{
        const query = event.target.value
        this.setState({query:query})
        this.searchBooks(query)
    }



    render(){
        const {query, resultBooks} = this.state
        const {onHideSearchPage} = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <button className="close-search" onClick={onHideSearchPage}>Close</button>
                <div className="search-books-input-wrapper">
                    <input type="text"
                           value={query}
                           placeholder="Search by title or author"
                           onChange={this.handleChange}/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {
                    //console.log(resultBooks)
                    }
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