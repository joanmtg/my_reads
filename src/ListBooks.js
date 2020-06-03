import React, { Component } from 'react'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
    render(){
        const {books, onShowSearchPage} = this.props
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
                    <Bookshelf title="Currently Reading" books={currentlyReading} />
                    <Bookshelf title="Want to Read" books={wantToRead} />
                    <Bookshelf title="Read" books={read} />
                </div>
                </div>
                <div className="open-search">
                <button onClick={onShowSearchPage}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default ListBooks