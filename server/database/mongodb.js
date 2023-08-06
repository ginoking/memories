//Import the mongoose module
const { log } = require("debug/src/browser");
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var StoriesSchema = new Schema({
  name: {
    type: String,
    required: [true]
  },
  date: {
    type: Date,
    required: [true]
  },
  des: {
    type: String,
    required: [true]
  },
  image: {
    type: String
  }
});

// Compile model from schema
var Stories = mongoose.model("Stories", StoriesSchema);

//Set up default mongoose connection
var mongoDB = "mongodb://127.0.0.1/memories";
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var database = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
database.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = Stories;
