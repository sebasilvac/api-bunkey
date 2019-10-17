require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cargamos rutas o controladores
app.use( require('./routes/index') );

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb://localhost:27017/bunkey', (err, res) => {
  if(err) throw err;
  console.log("DB Online");
});


app.listen(process.env.PORT, () => {
  console.log(`escuchando puerto http://localhost:${process.env.PORT}`)
})