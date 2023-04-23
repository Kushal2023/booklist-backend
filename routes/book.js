const express = require("express");
const Book = require("../schemas/Book");
const verify = require("../verifyToken");

const router = express.Router();

router.post("/add", verify, async (req, res) => {
  const newBook = new Book(req.body);

  try {
    const savedBook = await newBook.save();
    res.status(200).send(savedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:bookId", verify, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.status(200).send("Book has been deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/:bookId", verify, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get-all/:userId", verify, async (req, res) => {
    try {
      const allBooks = await Book.find(
        {userid:req.params.userId}
      );
  
      res.status(200).json(allBooks);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
