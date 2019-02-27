import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelves from './BookShelves'
import Book from './Book'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    search: [],
    main: this
  }

  onClickSearch = () => {
    this.setState({ showSearchPage: true })
  }
  getData = () => {
    BooksAPI.getAll().then(data => {
      
      this.setState({books:[]})
      var newArray = this.state.books.slice();
      for(let i=0; i<data.length; i++){
          newArray.push(data[i])
      }
      this.setState({books:newArray})
    })
  }
  componentDidMount(){
    this.getData()
  }

  update = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      this.getData()
    });
  }

  onChange(event){
    if(event.target.value === ""){
      this.setState({search:[]})
    }
    else
    {
      BooksAPI.search(event.target.value).then((data) => {
        this.setState({search:[]})
        var newArray = this.state.search.slice();
        for(let i=0; i<data.length; i++){
            newArray.push(data[i])
        }
        this.setState({search:newArray})
      });
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" onChange={this.onChange.bind(this)} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.search.map ( book => (    
                    <Book key={book.id} state={this.state} book={book} update={this.update}></Book>
                )
                )}
              </ol>
            </div>
          </div>
        ) : (
          <BookShelves state={this.state} update={this.update}></BookShelves>
          
        )}
      </div>
    )
  }
}

export default BooksApp
