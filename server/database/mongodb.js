//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB = process.env.mongoDBUrI + "/memories";
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var database = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
database.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = mongoose;
