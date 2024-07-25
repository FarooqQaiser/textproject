import React, { useState, useEffect } from "react";
import "./App.css";
import { MdOutlineClose } from "react-icons/md";

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searching, setSearching] = useState(false);
  const [bookId, setBookId] = useState(null);
  const [bookTitle, setBookTitle] = useState(null);
  const [bookPublisher, setBookPublisher] = useState(null);
  const [bookYear, setBookYear] = useState(null);
  const [bookHandle, setBookHandle] = useState(null);
  const [bookPages, setBookPages] = useState(null);
  const [showBookDetails, setShowBookDetails] = useState(false);

  useEffect(() => {
    fetch("https://stephen-king-api.onrender.com/api/books")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setBooks(data.data);
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = books.slice(startIndex, endIndex);

  const showAllBooks = () => {
    setSearching(false);
    setCurrentPage(1);
  };

  const searchBook = () => {
    const inputValue = document.querySelector(".inputToSearchABook").value;
    setSearching(true);
    books.map((book) => {
      if (inputValue === book.Title) {
        setBookId(book.id);
        setBookTitle(book.Title);
        setBookPublisher(book.Publisher);
        setBookYear(book.Year);
        setBookHandle(book.handle);
        setBookPages(book.Pages);
      }
    });
  };

  const openBookDetails = (id) => {
    setShowBookDetails(true);
    books.map((book) => {
      if (id === book.id) {
        setBookId(book.id);
        setBookTitle(book.Title);
        setBookPublisher(book.Publisher);
        setBookYear(book.Year);
        setBookHandle(book.handle);
        setBookPages(book.Pages);
      }
    });
  };

  const dontShowBookDetails = () => {
    setShowBookDetails(false);
  };

  const handleCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generateButtonsForPagination = (totalPages) => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      const isActive = currentPage === i;
      const className = isActive ? "buttonActivated" : "";
      buttons.push(
        <button
          key={i}
          onClick={() => handleCurrentPage(i)}
          className={className}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="App">
      <header>
        <div className="topic">
          <h1 onClick={showAllBooks}>Stephen King Books</h1>
        </div>
        <div className="searchBar">
          <input
            type="text"
            className="inputToSearchABook"
            name="searchBar"
            placeholder="Search by book name"
          />
          <button onClick={searchBook}>Search</button>
        </div>
      </header>

      <div
        className={`bookDetails ${
          showBookDetails ? "" : "dontShowBookDetails"
        }`}
      >
        <div className="bookDetailsHeading">
          <div className="heading">
            <h1>Book Details</h1>
          </div>
          <div className="closeButton">
            <button onClick={dontShowBookDetails}>
              <MdOutlineClose />
            </button>
          </div>
        </div>
        <div className="bookDetailsContent">
          <p>
            Title of the book: <span>{bookTitle}</span>
          </p>
          <div>
            <p>
              Published by: <strong>{bookPublisher}</strong>
            </p>
            <p>
              Published in: <strong>{bookYear}</strong>
            </p>
            <p>
              Book handle: <strong>{bookHandle}</strong>
            </p>
            <p>
              Book number of pages: <strong>{bookPages}</strong>
            </p>
          </div>
        </div>
      </div>

      <div className={`searchedBook ${searching ? "" : "disableSearchedBook"}`}>
        <div>
          <h2>
            {bookId}. {bookTitle}
          </h2>
          <p>
            Published by: <strong>{bookPublisher}</strong>
          </p>
          <p>
            Published in: <strong>{bookYear}</strong>
          </p>
          <p>
            Book handle: <strong>{bookHandle}</strong>
          </p>
          <p>
            Book number of pages: <strong>{bookPages}</strong>
          </p>
          <div className="openSearchedBookDetails">
            <button onClick={() => openBookDetails(bookId)}>Open</button>
          </div>
        </div>
      </div>

      <div className={`books ${searching ? "disableBooks" : ""}`}>
        <div className="listOfBooks">
          {Array.isArray(currentItems) ? (
            currentItems.map((book) => (
              <>
                <div className="book" key={book.id}>
                  <h2>
                    {book.id}. {book.Title}
                  </h2>
                  <p>
                    Published by: <strong>{book.Publisher}</strong>
                  </p>
                  <p>
                    Published in: <strong>{book.Year}</strong>
                  </p>
                  <p>
                    Book handle: <strong>{book.handle}</strong>
                  </p>
                  <p>
                    Book number of pages: <strong>{book.Pages}</strong>
                  </p>
                  <div className="openBookDetails">
                    <button onClick={() => openBookDetails(book.id)}>
                      Open
                    </button>
                  </div>
                </div>
              </>
            ))
          ) : (
            <p>No books available</p>
          )}
        </div>
      </div>

      <footer>
        <div className={`pagination ${searching ? "disablePagination" : ""}`}>
          {generateButtonsForPagination(totalPages)}
        </div>
      </footer>
    </div>
  );
}

export default App;
