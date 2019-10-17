const express = require('express');

const app = express();

app.use(require('./users'));
app.use(require('./login'));
app.use(require('./queries'));

module.exports = app;