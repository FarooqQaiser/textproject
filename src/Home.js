import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import HeaderForSignUpAndLogIn from "./Header";
import Pagination from "./Pagination";
import Footer from "./Footer";
import Books from "./Books";
import SearchedBook from "./SearchedBook";
import BookDetails from "./BookDetails";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  const itemsPerPage = 8;
  const totalPages = Math.ceil(books.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = books.slice(startIndex, endIndex);
  let searchedBookNotFound = false;
  const loggedIn = true;

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
        return "";
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
        <div className="pb-5 flex justify-center">
          <h3 className="font-bold text-xl text-black">
            Sorry, searched book is not found, please check spelling and try
            again!
          </h3>
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
      return "";
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
      const className = isActive ? "bg-[#272727] text-white font-semibold" : "";
      buttons.push(
        <button
          key={i}
          onClick={() => handleCurrentPage(i)}
          className={`${className} text-black font-semibold border-2 border-[#131313] p-2 w-10 h-10 hover:bg-[#272727] hover:text-white rounded-lg`}
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
    <>
      <header>
        <HeaderForSignUpAndLogIn
          loggedIn={loggedIn}
          searchBook={searchBook}
          showAllBooks={showAllBooks}
        />
      </header>

      {showBookDetails ? (
        <>
          <BookDetails
            bookId={bookId}
            bookTitle={bookTitle}
            bookPublisher={bookPublisher}
            bookYear={bookYear}
            bookHandle={bookHandle}
            bookPages={bookPages}
            bookVillains={bookVillains}
            bookNotes={bookNotes}
            bookCreatedAt={bookCreatedAt}
            bookISBN={bookISBN}
            closeBookDetails={dontShowBookDetails}
          />
        </>
      ) : (
        <></>
      )}

      {htmlForBookNotFound}

      {searching ? (
        <>
          <div className="text-center m-5 p-5 bg-[#6395af] rounded-lg">
            <div className="flex justify-center gap-x-1">
              {searchedBookNotFound ? (
                <></>
              ) : (
                <>
                  <SearchedBook
                    bookId={bookId}
                    bookTitle={bookTitle}
                    bookPublisher={bookPublisher}
                    sendBookId={openBookDetails}
                  />
                  <button
                    className="bg-[#0000FF] p-3 mb-52 rounded-full"
                    onClick={closeSearchedBookDiv}
                  >
                    <MdOutlineClose />
                  </button>
                </>
              )}
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] justify-center gap-x-10 gap-y-10 ">
              {Array.isArray(currentItems) ? (
                currentItems.map((book) => (
                  <>
                    <Books book={book} sendBookId={openBookDetails} />
                  </>
                ))
              ) : (
                <p>No books available</p>
              )}
            </div>
          </div>
          <div className="mt-10">
            <Pagination
              totalPages={totalPages}
              renderNextPage={renderNextPage}
              renderPreviousPage={renderPreviousPage}
              generateButtonsForPagination={generateButtonsForPagination}
            />
          </div>
        </>
      ) : (
        <>
          <div className="text-center m-5 p-5 bg-[#6395af] rounded-lg">
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr] justify-center gap-x-10 gap-y-10 ">
              {Array.isArray(currentItems) ? (
                currentItems.map((book) => (
                  <>
                    <Books book={book} sendBookId={openBookDetails} />
                  </>
                ))
              ) : (
                <p>No books available</p>
              )}
            </div>
          </div>
          <div className="mt-10">
            <Pagination
              totalPages={totalPages}
              renderNextPage={renderNextPage}
              renderPreviousPage={renderPreviousPage}
              generateButtonsForPagination={generateButtonsForPagination}
            />
          </div>
        </>
      )}

      <footer className="w-full -mb-96">
        <Footer />
      </footer>
    </>
  );
}
