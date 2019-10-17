const express = require("express");
const Enrollment = require("../models/enrollment");
const app = express();

/**
 * Query 1
 * students con credits superior a 50 ordenados por courses
 */
app.get("/query1", function(req, res) {
  Enrollment.find({})
    .sort({ course: 1 })
    .populate({
      path: "students",
      select: "name credits",
      match: { credits: { $gt: 10 } }
    })

    .exec((err, enrollments) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        results: enrollments
      });
    });
});

/**
 * Query 2
 * courses con mas students.
 * en este caso los TRES cursos con más estudiantes
 */
app.get("/query2", function(req, res) {
  Enrollment.aggregate(
    [
      { $unwind: "$students" },
      {
        $group: {
          _id: "$_id",
          count: { $sum: 1 },
          course: {
            $push: "$course"
          }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 3 },
      {
        $project: {
          count: 1,
          course: 1,
          _id: 0
        }
      },
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "course"
        }
      }
    ],
    function(err, enrollments) {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        results: enrollments
      });
    }
  );
});

/**
 * Query 3
 * student, sus courses y credits.
 */
app.get("/query3", function(req, res) {
  Enrollment.find({})
    .populate("course")
    .populate("students")
    .exec((err, enrollments) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      // acá creamos un nuevo objeto con los datos ordenados students - courses - credits
      let students = {};

      // recorremos los registros y armamos el resultado de retorno
      enrollments.forEach(element => {
        // en primera instancia guardamos el course en una variable
        let course = {
          id: element.course._id,
          name: element.course.name
        };

        element.students.forEach(student => {
          // si el students se encuentra registrado solo añadimos el curso
          if (students[student._id] != undefined) {
            students[student._id].courses[course._id] = course;
            return;
          }

          // si el students no se encuentra registrado, lo añadimos al objeto
          var stu = {
            name: student.name,
            credits: student.credits,
            courses: {}
          };

          // añadimos el course correspondiente
          stu.courses[course.id] = course;

          // por ultimo añadimos el student al nuevo objeto
          students[student._id] = stu;
        });
      });

      res.json({
        ok: true,
        results: students
      });
    });
});

app.get("/query4", function(req, res) {
  Enrollment.find({})
    .sort({ course: 1 })
    .populate({
      path: "course",
      select: "name"
    })
    .populate({
      path: "students",
      select: "name credits"
    })

    .exec((err, enrollments) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        results: enrollments
      });
    });
});

module.exports = app;
