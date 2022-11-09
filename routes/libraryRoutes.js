const express = require('express')
const router = express.Router()

const {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
} = require('../controllers/libraryController')


router.get('/book', getAllBooks)
router.get('/book/:id', getSingleBook)
router.post('/book', createBook)
router.put('/book/:id', updateBook)
router.delete('/book/:id', deleteBook)


module.exports = router