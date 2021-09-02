import { UserSchema } from './User'

const mongoose = require('mongoose')

export const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    comments: [{
        user: {
            type: UserSchema,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    links: [ String ],
    created: {
        user: {
            type: UserSchema,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    fulfilled: {
        user: {
            type: UserSchema,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
})