const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    assignedTo: {
        type: String,
        required: [true, "assisgn is required"]
    },
    status: {
        type: String,
        required: [true, "assisgn is required"],
        default: 'Pending'
    },
    dueDate: {
        type: Date,
        required: [true, "due date is required"]
    },
    priority: {
        type: String,
        required: [true, "due date is required"]
    },
    comment: {
        type: String,
        required: [true, "comment is required"]
    }
}, { timestamps: true })
const Task = mongoose.model('Task', TaskSchema)
module.exports = Task