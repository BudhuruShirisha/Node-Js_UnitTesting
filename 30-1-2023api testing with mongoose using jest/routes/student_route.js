const express = require("express")
const { getStudents, insertStudents, updateStudent, deleteStudentById } = require("../controller/student")
const router = express.Router()

router.get("/:id", getStudents)
router.post("/", insertStudents)
router.put("/:id", updateStudent)
router.delete("/:id", deleteStudentById)
module.exports = router;