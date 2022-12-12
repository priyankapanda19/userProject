const studentModel = require("../model/studentModel.js")
const { isValidBody, isMark, isValidName } = require("../validation/valid.js")


const createStudent = async (req, res) => {
    try {
        let { studentName, subject, mark } = req.body

        const finalData = await studentModel.findOne({ studentName, subject, isDeleted: false })
        if (finalData) {
            if (!isMark(mark))
                return res.status(400).send({ status: false, message: "Mark contain only digits" });

            let updatedMark = await studentModel.findOneAndUpdate({ studentName, subject }, { $set: { mark: finalData.mark + mark } }, { new: true }).select({ _id: 0, studentName: 1, subject: 1, mark: 1 })
            res.status(201).send({ status: true, message: "Updated", data: updatedMark });
        } else {

            if (isValidBody(req.body))
                return res.status(400).send({ status: false, message: "Request body can't be empty" });

            if (!isValidName(studentName))
                return res.status(400).send({ status: false, message: "Student Name must be present and only Alphabats " });

            if (!isValidName(subject))
                return res.status(400).send({ status: false, message: "Subject Name must be present and only Alphabats" });

            if (!isMark(mark))
                return res.status(400).send({ status: false, message: "Mark contain only digits" });

            const result = await studentModel.create(req.body);
            res.status(201).send({ status: true, message: "Success", data: result });
        }
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getStudent = async (req, res) => {
    try {
        let { studentName, subject } = req.query;
        let filterQueryData = { isDeleted: false }
        if (studentName) {
            if (!isValidName(studentName))
                return res.status(400).send({ status: false, message: "Student Name must be present and only Alphabats " });
            filterQueryData['studentName'] = studentName
        }
        if (subject) {
            if (!isValidName(subject))
                return res.status(400).send({ status: false, message: "Subject Name must be present and only Alphabats" });
            filterQueryData['subject'] = subject
        }

        const finalData = await studentModel.find(filterQueryData).select({ _id: 0, studentName: 1, subject: 1, mark: 1 })
        if (finalData.length == 0) return res.status(404).send({ status: false, message: 'no student found' });
        return res.status(200).send({ status: true, message: 'Success', data: finalData });
    } catch (err) {
        res.status(500).send({ status: false, err: err.message })
    }
}


const deleteStudent = async (req, res) => {
    try {
        let { studentName, subject } = req.query;
        let student = await studentModel.findOneAndUpdate({ studentName, subject, isDeleted: false }, { isDeleted: true, deletedAt: new Date() }, { new: true });
        if (!student) {
            return res.status(404).send({ status: false, message: "Student not found with this Subject" });
        }
        return res.status(200).send({ status: true, message: "The Student Details deleted successfully" });
        
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}

module.exports = {
    createStudent,
    getStudent,
    deleteStudent
}


