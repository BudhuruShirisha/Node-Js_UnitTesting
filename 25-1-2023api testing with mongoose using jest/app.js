const express = require("express")
const app = express()
const studentRoute = require("./routes/student_route")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/student", studentRoute)
module.exports = app