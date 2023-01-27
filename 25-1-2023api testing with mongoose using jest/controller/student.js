const studentModel = require("../model/student.model");

async function getStudents(req, res) {
    try {
        const studentData = await studentModel.find({});
        console.log(studentData);
        if (!studentData.length) throw "student not found";
        res.status(200).send(studentData);
    } catch (err) {
        res.status(400).json({
            message: err,
        });
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


module.exports = { getStudents, insertStudents };