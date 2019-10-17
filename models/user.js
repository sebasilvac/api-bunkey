const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre del usuario es necesario']
    },
    email: {
        type: String,
        require: [true, 'El email es necesario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }
});

// al retornar el json eliminamos el password
userSchema.methods.toJSON = function(){
    let userObj = this.toObject();
    delete userObj.password;
    return userObj;
}

// uniqueValidator formatea el mensaje de error "unique" ya que es distinto a los otros
userSchema.plugin(uniqueValidator, {
    message: 'El campo {PATH} debe ser único'
});

module.exports = mongoose.model('User', userSchema);