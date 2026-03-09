// src/features/BookForm.jsx
import { useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styles from "./BookForm.module.css";

function BookForm({ onAddBook, isSaving }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [about, setAbout] = useState("");
  const [like, setLike] = useState("");
  const [rating, setRating] = useState(1);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !author.trim()) {
      setError("Please fill out both Title and Author.");
      return;
    }

    setError("");

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      about: about.trim(),
      isCompleted: false,
      rating: Number(rating),
      like: like === "Yes" ? "Yes" : "No",
    };

    await onAddBook(bookData);

    // Reset form
    setTitle("");
    setAuthor("");
    setAbout("");
    setLike("");
    setRating(1);
  };

  return (
    <form className={styles.bookForm} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}

      <TextInputWithLabel
        elementId="title"
        labelText="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <TextInputWithLabel
        elementId="author"
        labelText="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />

      <TextInputWithLabel
        elementId="about"
        labelText="About"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      />

      <label htmlFor="like">Like</label>
      <select
        id="like"
        value={like}
        onChange={(e) => setLike(e.target.value)}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label htmlFor="rating">Rating</label>
      <select
        id="rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value={1}>1 ⭐</option>
        <option value={2}>2 ⭐⭐</option>
        <option value={3}>3 ⭐⭐⭐</option>
        <option value={4}>4 ⭐⭐⭐⭐</option>
        <option value={5}>5 ⭐⭐⭐⭐⭐</option>
      </select>

      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Add Book"}
      </button>
    </form>
  );
}

export default BookForm;
