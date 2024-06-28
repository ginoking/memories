const { string } = require('yup');
var mongoose = require('./mongodb');

//Define a schema
var Schema = mongoose.Schema;

var CredentialsSchema = new Schema({
    id: {
        type: String,
        required: [true]
    },
    publicKey: {
        type: String,
        required: [true]
    },
    transports: {
        type: Array,
        required: [true]
    },
    registered: {
        type: Date,
        required: [true]
    },
    last_used: {
        type: Date,
        required: [true]
    },
    user_id: {
        type: String,
        required: true
    }
});

// Compile model from schema
var Credentials = mongoose.model("Credentials", CredentialsSchema);

module.exports = Credentials;