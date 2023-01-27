const mongoose = require("mongoose")
mongoose.set('strictQuery', false);


mongoose.connect(
    "mongodb://localhost:27017/studentDb", (err, data) => {
        if (!err) {
            console.log("db connect succesfully")
        }
    }
);
//mongoose.connection.close()

module.exports = mongoose;