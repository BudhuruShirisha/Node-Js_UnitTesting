const express = require("express")
const { getStudents, insertStudents } = require("../controller/student")
const router = express.Router()

router.get("/", getStudents)
router.post("/", insertStudents)

module.exports = router;