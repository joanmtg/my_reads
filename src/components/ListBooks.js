import React, { Component } from 'react'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render(){
        const {books, onUpdateBook} = this.props
        const currentlyReading = books.filter((book) => { return book.shelf === 'currentlyReading'})
        const wantToRead = books.filter((book) => {return book.shelf === 'wantToRead'})
        const read = books.filter((book) => {return book.shelf === 'read'})

        return (
            <div className="list-books">
            {console.log(books)}
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <Bookshelf title="Currently Reading" books={currentlyReading} onUpdateBook={onUpdateBook}/>
                    <Bookshelf title="Want to Read" books={wantToRead} onUpdateBook={onUpdateBook}/>
                    <Bookshelf title="Read" books={read} onUpdateBook={onUpdateBook}/>
                </div>
                </div>
                <Link to='/search'>
                    <div className="open-search">
                        <button>Add a book</button>
                    </div>
                </Link>
            </div>
        )
    }
}

export default ListBooks