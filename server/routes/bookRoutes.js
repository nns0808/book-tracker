import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
} from "../controllers/bookController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();

router.route("/")
  .get(protect, getBooks)
  .post(protect, createBook);

router.route("/:id")
  .get(protect, getBookById)
  .patch(protect, updateBook)  
  .put(protect, updateBook)    
  .delete(protect, deleteBook);


export default router;
