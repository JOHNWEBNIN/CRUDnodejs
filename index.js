const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app =express();

//database connection
const connection= mysql.createConnection({
	host: 'localhost',
	user:'root',
	password: '',
	database: 'inventory'
});
connection.connect(function(error) {
	if (!!error) console.log(error);
	else console.log('Database connected');
})

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
app.get('/items_create',(req, res) => {
	res.render('items_create');
});
app.get('/items_edit',(req, res) => {
	res.render('items_edit');
});
app.get('/items_delete',(req, res) => {
	res.render('items_delete');
});


// server listening
app.listen(3000, ()=> {
	console.log('Server listening at port 3000')
});