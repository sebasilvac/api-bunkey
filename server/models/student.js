const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let studentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del estudiante es necesario']
    },
    credits: Number
});

module.exports = mongoose.model('Student', studentSchema);