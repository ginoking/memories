var mongoose = require('./mongodb');

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
        type: String,
        required: [true]
    },
    type: {
        type: String,
        required: [true]
    }
});

// Compile model from schema
var Stories = mongoose.model("Stories", StoriesSchema);

module.exports = Stories;