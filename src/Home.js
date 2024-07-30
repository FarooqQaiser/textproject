import React, { useState, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";
import HeaderForSignUpAndLogIn from "./Header";
import Pagination from "./Pagination";
import Footer from "./Footer";

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
  const loggedIn = true;

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
          <div className="fixed grid grid-rows-[1fr_10fr] mx-[25%] w-1/2 h-4/5 bg-[#272727] rounded-lg">
            <div className="grid grid-cols-[22fr_1fr] w-full">
              <div className="flex items-center justify-center mt-2 text-center text-xl text-[#6395af] font-semibold">
                <h1>Book Details</h1>
              </div>
              <div className="flex justify-end">
                <button
                  className="text-white align-top h-1/4 p-3"
                  onClick={dontShowBookDetails}
                >
                  <MdOutlineClose />
                </button>
              </div>
            </div>
            <div className="ml-5 flex flex-col items-center gap-4 ">
              <p className="text-xl font-semibold text-[#6395af]">
                Title of the book:
                <span className="text-white text-2xl font-bold ml-3 border-b-2 border-white">
                  {bookTitle}
                </span>
              </p>
              <div className="flex flex-col gap-4 text-left w-full ">
                <p className="text-[#6395af]">
                  Published by:{" "}
                  <strong className="font-semibold text-white">
                    {bookPublisher}
                  </strong>
                </p>
                <p className="text-[#6395af]">
                  Published in:{" "}
                  <strong className="font-semibold text-white">
                    {bookYear}
                  </strong>
                </p>
                <p className="text-[#6395af]">
                  Book handle:{" "}
                  <strong className="font-semibold text-white">
                    {bookHandle}
                  </strong>
                </p>
                <p className="text-[#6395af]">
                  Book number of pages:{" "}
                  <strong className="font-semibold text-white">
                    {bookPages}
                  </strong>
                </p>
                <p className="text-[#6395af]">
                  Book villains:{" "}
                  <strong className="font-semibold text-white">
                    {bookVillains}
                  </strong>
                </p>
                <p className="text-[#6395af]">
                  Book notes:{" "}
                  <strong className="font-semibold text-white">
                    {bookNotes}
                  </strong>
                </p>
                <p className="text-[#6395af]">
                  Book created at:{" "}
                  <strong className="font-semibold text-white">
                    {bookCreatedAt}
                  </strong>
                </p>
                <p className="text-[#6395af]">
                  Book ISBN:{" "}
                  <strong className="font-semibold text-white">
                    {bookISBN}
                  </strong>
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
          <div className="text-center m-5 p-5 bg-[#6395af] rounded-lg">
            <div className="flex justify-center gap-x-1">
              {searchedBookNotFound ? (
                <></>
              ) : (
                <>
                  <div className="flex flex-col gap-4 justify-between text-start w-72 h-60 p-5 bg-[#131313]/90 border-4 border-gray-400 rounded-md hover:bg-[#272727]/90 hover:text-white hover:border-8">
                    <h2 className="text-center text-2xl font-semibold">
                      {" "}
                      {bookTitle}
                    </h2>
                    <p>
                      Published by: <strong>{bookPublisher}</strong>
                    </p>
                    <button
                      className="bg-[#0000FF] p-3 rounded-md"
                      onClick={() => openBookDetails(bookId)}
                    >
                      Open
                    </button>
                  </div>
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
                    <div
                      className="flex flex-col gap-4 justify-between text-start w-72 h-60 p-5 bg-[#131313]/90 border-4 border-gray-400 rounded-md hover:bg-[#272727]/90 hover:text-white hover:border-8"
                      key={book.id}
                    >
                      <h2 className="text-center text-2xl font-semibold">
                        {" "}
                        {book.Title}
                      </h2>
                      <p>
                        Published by: <strong>{book.Publisher}</strong>
                      </p>
                      <button
                        className="bg-[#0000FF] p-3 rounded-md"
                        onClick={() => openBookDetails(book.id)}
                      >
                        Open
                      </button>
                    </div>
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
                    <div
                      className="flex flex-col gap-4 justify-between text-start w-72 h-60 p-5 bg-[#131313]/90 border-4 border-gray-400 rounded-md hover:bg-[#272727]/90 hover:text-white hover:border-8"
                      key={book.id}
                    >
                      <h2 className="text-center text-2xl font-semibold">
                        {" "}
                        {book.Title}
                      </h2>
                      <p>
                        Published by: <strong>{book.Publisher}</strong>
                      </p>
                      <button
                        className="bg-[#0000FF] p-3 rounded-md"
                        onClick={() => openBookDetails(book.id)}
                      >
                        Open
                      </button>
                    </div>
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
