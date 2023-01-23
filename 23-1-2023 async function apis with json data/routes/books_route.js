const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bookdata = require("../data/books.json");
const { save } = require("../service/book_service");
router.get("/", (req, res) => {
    res.send(bookdata);
});

router.post(
    '/', [
        check('name', 'Book name is required').not().isEmpty(),
        check('author', 'author name is required').not().isEmpty()
    ],
    (req, res) => {
        const { name, author } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        bookdata.push({
            name,
            author,
            id: Math.floor((Math.random() * 10) + 1)
        });

        const isSaved = save(bookdata);
        if (!isSaved) {
            return res.status(400).json({
                error: true,
                message: 'could not save book'
            });
        }
        return res.status(200).json({
            message: "success"
        })
    }
);

router.put("/:bookid", (req, res) => {
    const { bookid } = req.params;
    const { name, author } = req.body;

    const founddata = bookdata.find((book) => book.id == bookid);
    if (founddata == undefined) {
        return res.status(404).json({
            error: true,
            message: "Book not found"
        })
    }
    let updatedbooks = bookdata.map((book) => {
        if (book.id == bookid) {
            let updatedbook = {

                ...book,
                name,
                author
            }
            return updatedbook;
        }
        return book;
    })
    const issaved = save(updatedbooks)
    if (!issaved) {
        return res.status(500).json({
            error: true,
            message: 'could not save book'
        });
    }
    return res.status(200).json({
        message: "success"
    })
})
router.delete("/:bookid", (req, res) => {
    const { bookid } = req.params;
    const founddata = bookdata.find((book) => book.id == bookid)
    if (!founddata) {
        return res.status(200).json({
            message: "book not found"
        })
    }
    const filtereddata = bookdata.filter((book) => book.id != bookid)
    const isSaved = save(filtereddata)
    if (!isSaved) {
        return res.status(500).json({
            error: true,
            message: 'could not save book'
        });
    }
    return res.status(200).json({
        message: "deleted book"
    })
})

module.exports = router;