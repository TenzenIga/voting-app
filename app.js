const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const poll = require('./routes/poll');
const users =require('./routes/users');
const Poll = require('./models/polls');
//Connect to Database
mongoose.connect(config.database);

mongoose.connection.on('connected', ()=>{
  console.log('conected to database '+ config.database);
});

mongoose.connection.on('error', (err)=>{
  console.log('Database error '+ err);
});

const app= express();
const port = process.env.PORT || 3000;

app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser MW
app.use(bodyParser.json());

//Passport MW
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);

//Index Route
app.use('/', poll);

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, ()=>{
  console.log('Server started on port '+ port);
});
