const mongoose = require("mongoose");

// entregar uma porta
const DB_USER = "fam";
const DB_PASSWORD = encodeURIComponent("ewDN8UuXRrMGMm6G");
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