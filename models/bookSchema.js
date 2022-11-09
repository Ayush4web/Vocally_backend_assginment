const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title of the book is required'],
    trim: true,
    maxLength: 20,
  },
  author: {
    type: String,
    required: [true, 'Author of the book is required'],
    trim: true,
    maxLength: 20,
  },
  publication: {
    type: String,
    trim: true,
    default: 'Unknown',
    maxLength: 20,
  },
  year: {
    type: Number,
  },
})

module.exports = mongoose.model('Books', bookSchema)
