const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app =express();


// views file
app.set('views' ,path.join(__dirname,'views'));

//view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

// routes
app.get('/',(req, res) => {
	res.render('items_index');
});
app.get('/item_create',(req, res) => {
	res.render('items_create');
});


// server listening
app.listen(3000, ()=> {
	console.log('Server listening at port 3000')
});