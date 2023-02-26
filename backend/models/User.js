const mongoose = require("mongoose");

const {Schema} = mongoose;

const {taskSchema} = require("./Task");

const userSchema = new Schema({
    name :{
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [taskSchema],
        required: false
    }
})