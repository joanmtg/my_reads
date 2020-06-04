import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
class SearchBooks extends Component {

    state = {
        query:'',
        resultBooks:[]
    }


    handleChange = (event) =>{
        const query = event.target.value
        this.setState({query: query})
        if(query.length > 0){
            BooksAPI.search(query)
                .then((books) =>{
                    this.setState({resultBooks:books})
                })
        }else{
            this.setState({resultBooks:[]})
        }
    }

    render(){
        const {query, resultBooks} = this.state
        const {onHideSearchPage} = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <button className="close-search" onClick={onHideSearchPage}>Close</button>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text"
                           value={query}
                           placeholder="Search by title or author"
                           onChange={this.handleChange}/>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid">
                    {console.log(resultBooks)}
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