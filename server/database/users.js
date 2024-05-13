var mongoose = require('./mongodb');
var passportLocalMongoose = require('passport-local-mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    challenge: {
        type: String,
    },
    passkeys: {
        type: Array,
        default: []
    }
});

UsersSchema.plugin(passportLocalMongoose, {
    findByUsername: function (model, queryParameters) {
        // Add additional query parameter - AND condition - active: true
        queryParameters.active = true;
        return model.findOne(queryParameters);
    }
});

// Compile model from schema
var Users = mongoose.model("Users", UsersSchema);


module.exports = Users;