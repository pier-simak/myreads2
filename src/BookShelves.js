import React from 'react'
import Book from './Book'
import './App.css'

class BookShelves extends React.Component {
    render(){

        const state = this.props.state
        this.update = this.props.update

        let currentlyReading = state.books.filter(
            book => book.shelf === "currentlyReading"
        )
        let wantToRead = state.books.filter(
            book => book.shelf === "wantToRead"
        )
        let Read = state.books.filter(
            book => book.shelf === "read"
        )
        return(
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {currentlyReading.map ( book => (    
                                <Book key={book.id} state={state} book={book} update={this.update}></Book>
                            )
                            )}
                        </ol>
                    </div>
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {wantToRead.map ( book => (    
                                <Book key={book.id} state={state} book={book} update={this.update}></Book>
                            )
                            )}
                        </ol>
                    </div>
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {Read.map ( book => (    
                                <Book key={book.id} state={state} book={book} update={this.update}></Book>
                            )
                            )}
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
                <div className="open-search">
                <button onClick={() => this.props.state.main.onClickSearch()}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default BookShelves