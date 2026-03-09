import Book from "../models/Book.js";


// Create a book
export const createBook = async (req, res) => {
  const { title, author, about, like, rating, isCompleted } = req.body;

  const book = await Book.create({
    user: req.user._id,
    title,
    author,
    about,
    like,
    rating,
    isCompleted,
  });

  res.status(201).json(book);
};

// Get all books
export const getBooks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  console.log("PAGE:", page);
  console.log("LIMIT:", limit);
  console.log("SKIP:", limit * (page - 1));

  const keyword = req.query.keyword
    ? { title: { $regex: req.query.keyword, $options: "i" } }
    : {};

  const sortField = req.query.sortField || "createdAt";
  const sortDirection = req.query.sortDirection === "asc" ? 1 : -1;

  const filter = {
    user: req.user._id,
    ...keyword,
  };

  const count = await Book.countDocuments(filter);

  const books = await Book.find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .skip(limit * (page - 1));

  res.json({
    books,
    page,
    pages: Math.ceil(count / limit),
  });
};

// Get single book by ID
export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  res.json(book);
};

// Update book
export const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  Object.assign(book, req.body);
  const updatedBook = await book.save();
  res.json(updatedBook);
};

// Delete book
export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await book.deleteOne();
  res.json({ message: "Book deleted" });
};