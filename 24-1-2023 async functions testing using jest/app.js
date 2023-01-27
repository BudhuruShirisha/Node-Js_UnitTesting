const express = require("express");
const app = express();
const bookroute = require("./routes/books_route")
app.use(express.json());
app.use("/books", bookroute)
module.exports = app