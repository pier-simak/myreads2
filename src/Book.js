import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class Book extends React.Component {
    change(event) {
        // this.setState({value: event.target.value});
        BooksAPI.update(this.props.book, event.target.value).then((res) => {
          this.props.state.main.getData()
        }); 
      }
    render() {
        let book = this.props.book
        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    {book.imageLinks && (
                        <div className="book-cover" style={{ width: 128, height: 193, 
                        backgroundImage: 'url("'+ book.imageLinks.thumbnail+'")'  }}></div>
                    )}
                    <div className="book-shelf-changer">
                        <select onChange={this.change.bind(this)} value={book.shelf}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default Book








