const BadRequest = require('../errors/BadRequest')
const Book = require('../models/bookSchema')

const createBook = async (req, res) => {
  const { title, author, publication, year } = req.body

  if (!title || !author) {
    throw new BadRequest('Please Provide Title & Author names.')
  }

  const book = await Book.create({ title, author, publication, year })
  res.status(201).json({
    msg: 'Book created Succesfully!',
    book: book,
  })
}

const getAllBooks = async (req, res) => {
  const book = await Book.find({})

  res.status(200).json(book)
}

const getSingleBook = async (req, res) => {
  const id = req.params.id
  const book = await Book.findById({ _id: id })

  res.status(200).json(book)
}

const deleteBook = async (req, res) => {
  const id = req.params.id
  const book = await Book.findByIdAndDelete({ _id: id })

  res.status(200).json({ msg: 'Book deleted Succesfully' })
}

const updateBook = async (req, res) => {
  const { title, author, publication, year } = req.body
  const id = req.params.id
  const book = await Book.findOneAndUpdate(
    { _id: id },
    {
      title,
      author,
      publication,
      year,
    }
  )
 
  res.status(200).json({msg:"Book updated succesfully"})
}

module.exports = {
  createBook,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
}
