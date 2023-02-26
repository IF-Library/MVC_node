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
        type: Date,
        require: true
    },
    isLate: {
        type: Boolean,
        required: false
    }
}, { timestamps: true });