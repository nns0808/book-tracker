export const initialState = {
  bookList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: "",
  sortField: "createdAt",
  sortDirection: "desc",
  queryString: "",
};

export const actions = {
  fetchBook: "FETCH_BOOK",
  loadBook: "LOAD_BOOK",
  addBook: "ADD_BOOK",
  updateBook: "UPDATE_BOOK",
  deleteBook: "DELETE_BOOK",
  setSortField: "SET_SORT_FIELD",
  setSortDirection: "SET_SORT_DIRECTION",
  setQueryString: "SET_QUERY_STRING",
  clearError: "CLEAR_ERROR",
  setLoadError: "SET_LOAD_ERROR",
  startRequest: "START_REQUEST",
  endRequest: "END_REQUEST",
};

export function bookReducer(state, action) {
  switch (action.type) {
    case actions.fetchBook:
      return { ...state, isLoading: true, errorMessage: "" };

    case actions.loadBook:
      return { ...state, bookList: action.records, isLoading: false };

    case actions.addBook: {
      const savedBook = {
        _id: action.record._id,
        title: action.record.title,
        author: action.record.author,
        about: action.record.about || "",
        like: action.record.like || "",
        isCompleted: action.record.isCompleted || false,
        rating: action.record.rating || 0,
        createdAt: action.record.createdAt,
      };
      return { ...state, bookList: [savedBook, ...state.bookList], isSaving: false };
    }

    case actions.updateBook: {
      const updatedList = state.bookList.map((book) =>
        book._id === action.editedBook._id ? { ...action.editedBook } : book
      );
      return { ...state, bookList: updatedList, isSaving: false };
    }

    case 'deleteBook':
      return {
        ...state,
        bookList: state.bookList.filter((book) => book._id !== action.bookId),
      };

    case actions.setSortField:
      return { ...state, sortField: action.payload };
    case actions.setSortDirection:
      return { ...state, sortDirection: action.payload };
    case actions.setQueryString:
      return { ...state, queryString: action.payload };
    case actions.clearError:
      return { ...state, errorMessage: "" };
    case actions.setLoadError:
      return { ...state, errorMessage: action.error?.message || "", isLoading: false, isSaving: false };
    case actions.startRequest:
      return { ...state, isSaving: true };
    case actions.endRequest:
      return { ...state, isSaving: false };
    default:
      return state;
  }
}


