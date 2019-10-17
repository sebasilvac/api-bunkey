const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let courseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del curso es necesario']
    }
});

module.exports = mongoose.model('Course', courseSchema);