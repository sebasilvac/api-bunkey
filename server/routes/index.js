const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.json({ status: "success", message: "Welcome to Bunkey API" });
});

app.use(require('./users'));
app.use(require('./login'));
app.use(require('./queries'));

module.exports = app;