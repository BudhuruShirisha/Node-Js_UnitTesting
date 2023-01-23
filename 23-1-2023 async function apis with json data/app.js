const express = require("express");
const app = express();
const bookroute = require("./routes/books_route")
app.use(express.json());
app.use("/books", bookroute)
app.get("/", (req, res) => {
    res.send("hello1")
})
app.listen(7005, () => {
    console.log("app listenring at the port 7005")
})

module.exports = app