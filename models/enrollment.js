const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let enrollmentSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'El número identificador del curso es necesario']
    },
    students: [{
        type: Schema.Types.ObjectId, 
        ref: 'Student',
        required: [true, 'El número identificador del estudiante es necesario']
    }]
});


module.exports = mongoose.model('Enrollment', enrollmentSchema);