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
  const [bookNotes, setBookNotes] = useState([]);
  const [bookCreatedAt, setBookCreatedAt] = useState(null);
  const [bookVillains, setBookVillains] = useState(null);
  const [bookPages, setBookPages] = useState(null);
  const [bookISBN, setBookISBN] = useState(null);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [htmlForBookNotFound, setHtmlForBookNotFound] = useState(null);

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
  let searchedBookNotFound = false;

  const showAllBooks = () => {
    window.location.reload();
  };

  const searchBook = () => {
    const inputValue = document.querySelector(".inputToSearchABook").value;
    setSearching(true);
    if (books.find((book) => book.Title === inputValue)) {
      books.map((book) => {
        if (book.Title === inputValue) {
          setBookId(book.id);
          setBookTitle(book.Title);
          setBookPublisher(book.Publisher);
        }
      });
      searchedBookNotFound = false;
    } else {
      searchedBookNotFound = true;
    }
    checkIfBookFound();
  };

  const checkIfBookFound = () => {
    if (searchedBookNotFound) {
      setHtmlForBookNotFound(
        <div className="bookNotFound">
          <h3>Searched book is not found, check spelling and try again!</h3>
        </div>
      );
      setSearching(false);
    } else {
      setHtmlForBookNotFound(null);
    }
  };

  const closeSearchedBookDiv = () => {
    setSearching(false);
    searchedBookNotFound = false;
    setHtmlForBookNotFound(null);
    setSearching(false);
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
        const notesString = book.Notes.map((note) => note).join(", ");
        setBookNotes(notesString);
        setBookCreatedAt(book.created_at);
        const villainsString = JSON.stringify(
          book.villains.map((villain) => villain.name).join(", ")
        );
        setBookVillains(villainsString);
        setBookISBN(book.ISBN);
      }
    });
  };

  const dontShowBookDetails = () => {
    setShowBookDetails(false);
  };

  const handleCurrentPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    setHtmlForBookNotFound(null);
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

  const renderPreviousPage = () => {
    const pageNumber = currentPage;
    if (pageNumber > 1) {
      setCurrentPage(pageNumber - 1);
      setHtmlForBookNotFound(null);
    }
  };

  const renderNextPage = () => {
    const pageNumber = currentPage;
    if (pageNumber < totalPages) {
      setCurrentPage(pageNumber + 1);
      setHtmlForBookNotFound(null);
    }
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

      {showBookDetails ? (
        <>
          <div className="bookDetails">
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
                <p>
                  Book villains: <strong>{bookVillains}</strong>
                </p>
                <p>
                  Book notes: <strong>{bookNotes}</strong>
                </p>
                <p>
                  Book created at: <strong>{bookCreatedAt}</strong>
                </p>
                <p>
                  Book ISBN: <strong>{bookISBN}</strong>
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {htmlForBookNotFound}

      {searching ? (
        <>
          <div className="searchedBook">
            {searchedBookNotFound ? (
              <></>
            ) : (
              <>
                <div>
                  <h2> {bookTitle}</h2>
                  <p>
                    Published by: <strong>{bookPublisher}</strong>
                  </p>
                  <div className="openSearchedBookDetails">
                    <button onClick={() => openBookDetails(bookId)}>
                      Open
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="closeSearchedBookDiv">
            <button onClick={closeSearchedBookDiv}>Close Search</button>
          </div>
        </>
      ) : (
        <>
          <div className="books">
            <div className="listOfBooks">
              {Array.isArray(currentItems) ? (
                currentItems.map((book) => (
                  <>
                    <div className="book" key={book.id}>
                      <h2> {book.Title}</h2>
                      <p>
                        Published by: <strong>{book.Publisher}</strong>
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
            <div className="pagination">
              <div className="paginationPrevButtonDiv">
                <button onClick={renderPreviousPage}>Prev</button>
              </div>
              <div className="paginationButtonsDiv">
                {generateButtonsForPagination(totalPages)}
              </div>
              <div className="paginationNextButtonDiv">
                <button onClick={renderNextPage}>Next</button>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
