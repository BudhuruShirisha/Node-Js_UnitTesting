const studentModel = require("../model/student.model");

async function getStudents(req, res) {
    try {
        const { id } = req.params
        const studentData = await studentModel.findOne({ id })
        if (studentData == null)
            throw "student id not found"
        return res.status(
            200).json({
            message: "success",
            results: studentData
        })
    } catch (err) {
        return res.status(400).json({
            err
        })
    }
}

function insertStudents(req, res) {
    try {
        const { name, dept, gender } = req.body;
        var Student = new studentModel({
            name,
            dept,
            gender,
        });
        Student.save((err, data) => {
            if (!err) {
                res.status(200).json({
                    status: "success",
                    results: data,
                });
            } else {
                return res.status(400).json({
                    message: "error in inserting employee",
                    results: err,
                });
            }
        });
    } catch (err) {
        return res.status(400).json({
            message: "error",
            results: err,
        });
    }
}

async function updateStudent(req, res) {
    try {
        const { id } = req.params;
        const updatedData = await studentModel.findOneAndUpdate({ id: id }, { $set: req.body });
        if (updatedData == null)
            throw "student id not found"
        return res.status(
            200).json({
            message: "updated student",
            results: updatedData
        })
    } catch (err) {
        return res.status(400).json({
            err
        })
    }
}

async function deleteStudentById(req, res) {
    try {
        const { id } = req.params;
        const deletedData = await studentModel.findOneAndRemove({ id: id })
        if (deletedData == null)
            throw "student id not found"
        res.status(
            200).json({
            message: "deleted student",
            results: deletedData
        })
    } catch (err) {
        res.status(400).json({
            err
        })
    }
}

module.exports = { getStudents, insertStudents, updateStudent, deleteStudentById };