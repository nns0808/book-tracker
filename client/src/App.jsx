import './App.css';
import { useEffect, useCallback, useReducer, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

import BookPage from './pages/BookPage.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Header from './shared/Header.jsx';

import {
  bookReducer,
  actions as bookActions,
  initialState as initialBookState,
} from './reducer/book.reducer.js';

import { API_URL } from './config.js';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const [bookState, dispatch] = useReducer(bookReducer, initialBookState);
  const {
    bookList,
    isLoading,
    isSaving,
    errorMessage,
    sortField,
    sortDirection,
    queryString,
  } = bookState;

  const [title, setTitle] = useState('Book Tracker');
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    switch (location.pathname) {
      case '/': setTitle('Book Tracker'); break;
      case '/about': setTitle('About'); break;
      case '/login': setTitle('Login'); break;
      default: setTitle('Not Found');
    }
  }, [location]);

  // Fetch all books
  const fetchBooks = useCallback(async () => {
  if (!token) return;

  dispatch({ type: bookActions.fetchBook });

  try {
    // Fetch all books, ignoring page/limit/sort/keyword temporarily
    const { data } = await axios.get(`${API_URL}/api/books`, {
      headers: { Authorization: `Bearer ${token}` },
       
    });

    // Debug logs
    console.log("Books Array:", data.books);
    console.log("API RESPONSE:", JSON.stringify(data, null, 2));
    console.log("Dispatching to reducer, records:", data.books);

    // Update state
    dispatch({ type: bookActions.loadBook, records: data.books });

  } catch (error) {
    dispatch({
      type: bookActions.setLoadError,
      error: { message: error.response?.data?.message || error.message },
    });
  }
}, [token]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  // Add book
  const addBook = async (newBook) => {
    if (!token) return;
    dispatch({ type: bookActions.startRequest });
    dispatch({ type: bookActions.clearError });
    try {
      const { data } = await axios.post(`${API_URL}/api/books`, newBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: bookActions.addBook, record: data });
    } catch (error) {
      dispatch({ type: bookActions.setLoadError, error: { message: error.response?.data?.message || error.message } });
    } finally { dispatch({ type: bookActions.endRequest }); }
  };

  // Update book
  const updateBook = async (editedBook) => {
    if (!token) return;
    try {
      const { data } = await axios.put(`${API_URL}/api/books/${editedBook._id}`, editedBook, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: bookActions.updateBook, editedBook: data });
    } catch (error) {
      dispatch({ type: bookActions.setLoadError, error: { message: error.response?.data?.message || error.message } });
    }
  };

  // Delete book
  const deleteBook = async (bookId) => {
    if (!token) return;
    try {
      await axios.delete(`${API_URL}/api/books/${bookId}`, { headers: { Authorization: `Bearer ${token}` } });
      dispatch({ type: 'deleteBook', bookId });
    } catch (error) { console.error('Failed to delete book:', error); }
  };

  return (
    <>
      {token && <Header title={title} />}
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <BookPage
              bookList={bookList}
              isLoading={isLoading}
              isSaving={isSaving}
              errorMessage={errorMessage}
              sortField={sortField}
              sortDirection={sortDirection}
              queryString={queryString}
              addBook={addBook}
              updateBook={updateBook}
              deleteBook={deleteBook} // <-- pass down
              setSortField={(field) => dispatch({ type: bookActions.setSortField, payload: field })}
              setSortDirection={(dir) => dispatch({ type: bookActions.setSortDirection, payload: dir })}
              setQueryString={(q) => dispatch({ type: bookActions.setQueryString, payload: q })}
              clearError={() => dispatch({ type: bookActions.clearError })}
            />
          </ProtectedRoute>
        }/>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;