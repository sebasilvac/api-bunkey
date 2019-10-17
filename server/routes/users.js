const express = require("express");
const verificaToken = require('../middlewares/auth');

const User = require("../models/user");
const Course = require("../models/course");
const Student = require("../models/student");
const Enrollment = require("../models/enrollment");
const bcrypt = require("bcrypt");

const app = express();

/**
 * Crea un usuario
 */
app.post("/user", verificaToken, function(req, res) {
  let body = req.body;

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

/**
 * Listar usuarios
 */
app.get("/user", verificaToken, function(req, res) {
  
  User.find({})
  .exec((err, userDB) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

/**
 * Creación de students
 */
app.post("/student", verificaToken, function(req, res) {
  let body = req.body;

  let student = new Student({
    name: body.name,
    credits: body.credits
  });

  student.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

/**
 * Creación de course
 */
app.post("/course", verificaToken, function(req, res) {
  let body = req.body;

  let course = new Course({
    name: body.name
  });

  course.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});

/**
 * Creación de enrollment
 */
app.post("/enrollment", verificaToken, function(req, res) {

  let course = "5da801a658fc7e3685fc09ff"; //'5da7cc7e189fb531e2955301';
  let student1 = "5da80064409fba365e676ebb";
  let student2 = "5da80036409fba365e676eb8";
  let student3 = "5da8003d409fba365e676eb9";
  let student4 = "5da80041409fba365e676eba";

  let enrollment = new Enrollment({
    course: course,
    students: [student1, student2, student3, student4]
  });

  enrollment.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      user: userDB
    });
  });
});


module.exports = app;
