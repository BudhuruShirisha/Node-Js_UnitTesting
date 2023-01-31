const mongoose = require("../db/db");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    dept: {
        type: String
    },
    gender: {
        type: String
    },
    id: {
        type: Number
    }
}, { versionKey: false })
studentSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model("student", studentSchema)