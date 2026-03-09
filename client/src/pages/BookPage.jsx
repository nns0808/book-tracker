// src/pages/BookPage.jsx
import { useState, useMemo, useEffect } from "react";
import BookForm from "../features/BookForm";
import BookList from "../features/BookList/BookList";
import BookViewForm from "../features/BookViewForm";
import styles from "./BookPage.module.css";

function BookPage({
  bookList,
  isLoading,
  isSaving,
  errorMessage,
  queryString,
  addBook,
  updateBook,
  deleteBook,
  setQueryString,
  clearError,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Reset to page 1 
  useEffect(() => {
    setCurrentPage(1);
  }, [queryString]);

  // Add new book
  const handleAddBook = async (newBook) => {
    try {
      await addBook({ ...newBook, rating: newBook.rating ?? 1 });
      setCurrentPage(1);
      setQueryString(""); 
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Delete a book
  const handleDeleteBook = (bookId) => {
    if (deleteBook) deleteBook(bookId);
  };

  // Filter books by search query
  const filteredList = useMemo(() => {
    if (!queryString) return bookList;
    return bookList.filter((book) =>
      book.title?.toLowerCase().includes(queryString.toLowerCase())
    );
  }, [bookList, queryString]);

  // Pagination
  const totalPages = Math.ceil(filteredList.length / booksPerPage);
  const startIdx = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredList.slice(startIdx, startIdx + booksPerPage);

  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  const handlePrevPage = () =>
    setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className={styles.bookPage}>
      {/* Only pass the search-related props */}
      <BookViewForm
        queryString={queryString}
        setQueryString={setQueryString}
        clearError={clearError}
        setCurrentPage={setCurrentPage}
      />

      <BookForm onAddBook={handleAddBook} isSaving={isSaving} />

      {isLoading && <p>Loading books...</p>}
      {errorMessage && <p className={styles.error}>Error: {errorMessage}</p>}

      <BookList
        bookList={currentBooks}
        onUpdateBook={updateBook}
        onDeleteBook={handleDeleteBook}
      />

      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default BookPage;