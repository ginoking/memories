var mongoose = require('./mongodb');
var passportLocalMongoose = require('passport-local-mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username: String,
    active: Boolean,
    created_at: Date
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