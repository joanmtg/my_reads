import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class Bookshelf extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render(){
        const {title, books, onUpdateBook} = this.props
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id}>
                            <Book book={book} onUpdateBook={onUpdateBook} />
                        </li>
                    ))}
                </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf