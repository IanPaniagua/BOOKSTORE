import express from 'express';
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from '../controllers/booksController.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = express.Router();

// Route for create a new Book
router.post('/', authRequired, createBook);

// Route for Get All Books from database
router.get('/', authRequired, getBooks);

// Route for Get One Book from database by id
router.get('/:id', authRequired, getBook);

// Route for Update a Book
router.put('/:id', authRequired, updateBook);

// Route for Delete a book
router.delete('/:id', authRequired, deleteBook);

export default router;
