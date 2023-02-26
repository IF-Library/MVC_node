const moongose = require("mongoose");

const { Schema } = moongose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isLate: {
        type: Boolean,
        required: false
    }
}, { timestamps: true });

const Task = moongose.model("Task", taskSchema);

module.exports = {
    Task,
    taskSchema
};

