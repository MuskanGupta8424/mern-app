const mongoose = require("mongoose");


async function connectDB(){
await mongoose.connect(process.env.MONGO_URI);
console.log("Connect DB to the server");
}

module.exports = connectDB;
