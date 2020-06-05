import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
class SearchBooks extends Component {

    state = {
        query:'',
        resultBooks: []
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.query !== this.state.query){
            const {query} = this.state
            if(query.trim() !== ''){
                BooksAPI.search(query)
                    .then((books) =>{
                        if(!books.hasOwnProperty('error')){
                            new Promise((resolve, reject)=>{
                                let booksWithShelves = books
                                for (let book of booksWithShelves){
                                    BooksAPI.get(book.id)
                                    .then((bookWithShelf) =>{
                                        book.shelf = bookWithShelf.shelf
                                    })
                                }
                                resolve(booksWithShelves)

                            }).then((booksWithShelves) =>{
                                setTimeout(() => { this.setState({resultBooks:booksWithShelves}) }, 1000)
                            })

                        }else{
                            this.setState({resultBooks:[]})
                        }
                    })
            }else{
                this.setState({resultBooks:[]})
            }
        }
    }

    handleChange = (event) =>{
        const query = event.target.value
        this.setState({query: query})
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
                            <Book book={book} />
                        </li>))
                    }
                </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks