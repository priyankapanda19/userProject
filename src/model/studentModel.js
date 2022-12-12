const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    mark: {
        type: Number,
        required: true,
        trim: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true });


module.exports = mongoose.model('Student123', studentSchema);