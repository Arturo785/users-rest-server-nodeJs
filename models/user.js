const { Schema, model } = require('mongoose');

//This defines the document in mongoDB

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique : true
    },
    password: {
        type: String,
        required: [true, "The password is required"]
    },
    image: {
        type: String
    },
    role: {
        type: String,
        required: [true, "The role is required"],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: String,
        default: false
    },
});

// overrides the default behaviour
//we make this to exclude the password and the __v
UserSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject(); // gets 2 speficic and the rest as user
    return user;
}

module.exports = model('User', UserSchema);