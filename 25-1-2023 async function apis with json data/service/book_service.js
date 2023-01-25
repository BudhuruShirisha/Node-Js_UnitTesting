const { json } = require("body-parser");
const fs = require("fs")
const path = require("path");

function save(bookdata) {
    try {
        fs.writeFileSync(path.join(__dirname, "..", "/data", "books.json"), JSON.stringify(bookdata))
        return true;
    } catch (err) {
        console.log(err)
        return false;
    }
}
module.exports = { save }