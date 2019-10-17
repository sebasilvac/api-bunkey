const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const app = express();


/**
 * login
 * recibe un email y password
 */
app.post('/login', (req, res) => {

    let body = req.body;

    // en primer lugar buscamos el usuario por el email
    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }

        // luego comparamos la password
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        // generamos el token
        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            user: userDB,
            token
        });

    });

});

module.exports = app;