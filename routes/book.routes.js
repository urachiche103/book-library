const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');

const fileMiddlewares = require('../middlewares/file.middleware');

const router = express.Router();

// view all books
router.get('/', async (req, res, next) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        return next(error);
    }
});

// find by id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const book = await Book.findById(id);
        if (book) {
            return res.status(200).json(book);
        } else {
            return res.status(404).json('No book found by this id');
        }
    } catch (error) {
        return next(error);
    }
});

// find by title
router.get('/title/:title', async (req, res) => {
    const {title} = req.params;
    try {
        const bookByTitle = await Book.find({ title: title });
        return res.status(200).json(bookByTitle);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// find by author
router.get('/author/:author', async (req, res) => {
    const {author} = req.params;
    try {
        const bookByAuthor = await Book.find({ author: author });
        return res.status(200).json(bookByAuthor);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// create a new book
// router.post('/create', async(req, res, next) => {
//     try {
//         const newBook = new Book({
//             author: req.body.author,
//             country: req.body.country,
//             language: req.body.language,
//             pages: req.body.pages,
//             title: req.body.title,
//             year: req.body.year
//         });
//         const createdBook = await newBook.save();
//         return res.status(201).json(createdBook);
//     } catch (error) {
//         next(error);
//     }
// });

// upload a picture
router.post('/create', [fileMiddlewares.upload.single('picture'), fileMiddlewares.uploadToCloudinary], async (req, res, next) => {
    try {
        const cloudinaryUrl = req.file_url ? req.file_url : null;
        const { author, country, language, pages, title, year } = req.body;
        const newBook = {
            author,
            country,
            language,
            pages,
            title,
            year,
            picture: cloudinaryUrl
        };
        newBook = new Book(newBook);
        const createdBook = await newBook.save();
        return res.status(201).json(createdBook);
    } catch (error) {
        next(error);
    }
});

// delete a book
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        await Book.findByIdAndDelete(id);
        return res.status(200).json('Book deleted!');
    } catch (error) {
        return next(error);
    }
});

// update a book
router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const bookModify = new Book(req.body)
        bookModify._id = id
        const bookUpdated = await Book.findByIdAndUpdate(id, bookModify)
        return res.status(200).json(bookUpdated)
    } catch (error) {
        return next(error)
    }
});

module.exports = router;
