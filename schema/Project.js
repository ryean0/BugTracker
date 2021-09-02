const mongoose = require('mongoose');
import { TaskSchema } from './Task';
import { UserSchema } from './User';

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    users: [ UserSchema ],
    tasks: [ TaskSchema ],
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    archived: [ TaskSchema ]
})

module.exports = Project = mongoose.model('project', ProjectSchema);