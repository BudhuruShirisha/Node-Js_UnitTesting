const mongoose = require("../db/db");
const studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    dept: {
        type: String
    },
    gender: {
        type: String
    }
}, { versionKey: false })
module.exports = mongoose.model("student", studentSchema)