const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // full name
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // get from gravatar
    avatar: {
        type: String,
    },
    // list of projects user was a part of
    projects: [
        {
            title: {
                type: String,
                required: true
            },
            // true = completed, false = in progress
            status: {
                type: Boolean,
                default: false
            },
            role: {
                type: String,
                required: true
            }
        }
    ],
    // when user was created
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);