const mongoose = require("mongoose");

const bcryptjs = require("bcryptjs");

const { Schema } = mongoose;

const { taskSchema } = require("./Task");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    tasks: {
        type: [taskSchema],
        required: false
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };

