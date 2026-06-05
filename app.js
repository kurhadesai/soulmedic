var express=require('express');
var session=require('express-session');
var fileupload=require('express-fileupload');
// require("dotenv").config()


var app=express();
var user=require('./routes/user.js');
var admin=require('./routes/admin.js');
const { access } = require('node:fs');
const { connect } = require('node:http2');

app.use(express.static('public'));
app.use(fileupload());

app.use(session({
    secret:'a2zithub',
    resave:false,
    saveUninitialized:true
}))


// access post data
app.use(express.urlencoded({extended:true}));

app.use('/',user);
app.use('/admin',admin);


app.listen(3000);

// app.listen(3000 || process.env.PORT);