const mongoose = require("mongoose");
require('dotenv').config();

// entregar uma porta
 const DB_USER = process.env.DB_USER;
 const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

const main = async () => {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apilibrary.fg1g4xd.mongodb.net/?retryWrites=true&w=majority`
        );
        console.log("Connecting")
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;