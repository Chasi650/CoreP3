const express = require('express');
const morgan  = require('morgan');
const cors = require('cors');

const app = express()

app.set('port', process.env.PORT || 4000);


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(require('./routes/Students.routes'))
app.use(require('./routes/nota.routes'))


module.exports = app;
