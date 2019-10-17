'use strict';

const faker = require('faker');
const _ = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
mongoose.Promise = Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/bunkey2');
const User = require('../models/user');
const Student = require('../models/student');
const Course = require('../models/course');
const Enrollment = require('../models/enrollment');

const AMMOUNT = {
  STUDENT: 20,
  COURSES: 10,
};

seed();

async function seed(){

  await seedUser();
  await seedStudents();
  await seedCourse();
  process.exit(0);
}

async function seedUser() {

  let user = new User({
    name: 'user_test',
    email: 'admin16@mail.com',
    password: bcrypt.hashSync('123456', 10)
  })
  
  await user.save((err, userDB) => {
    if (err) {}
    console.log('User seed complete');
  });
}

async function seedStudents() {
  const students = _.times(AMMOUNT.STUDENT, n => ({
    name: faker.name.findName(),
    credits: Math.floor((Math.random() * 100) + 1),
  }));
  
  await Student.insertMany(students).then(() => {
    console.log('Student seed complete');
  }, console.error.bind(console))
}

async function seedCourse() {
  const courses = _.times(AMMOUNT.COURSES, n => ({
    name: faker.name.jobArea(),
  }));
  
  await Course.insertMany(courses).then(() => {
    console.log('Course seed complete');
  }, console.error.bind(console))
}
