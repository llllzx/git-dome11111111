const mongoose = require('mongoose');

const shema = new mongoose.Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

const Task = mongoose.model('Task', shema, 'Task');

module.exports = Task;