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
	let sql ="SELECT * FROM items";
	let query = connection.query(sql, (err, rows) => {
		if(err) throw err;
		res.render('items_index',{
			title: "CRUD Built in Node.js",
			items : rows
		});
	});	
});


app.get('/items_create',(req, res) => {
	res.render('items_create');
});
app.post('/save', (req, res) => {
	let data = {name: req.body.name, quantity: req.body.quantity, amount: req.body.amount};
	let sql = "INSERT INTO items SET ?";
	let query = connection.query(sql, data, (err, results) => {
		if(err) throw err;
		res.redirect('/');
	});
});

app.get('/items_edit/:itemId',(req, res) => {
	const itemId = req.params.itemId;
	let sql	= `SELECT * FROM items where id = ${itemId}`;
	let query =connection.query(sql,(err, result) => {
		if(err) throw err;
		res.render('items_edit', {
			item : result[0]
		});
	});
});
app.post('/update',(req, res) => {
    const itemId = req.body.id;
    let sql = "update items SET name='"+req.body.name+"',  quantity='"+req.body.quantity+"',  amount='"+req.body.amount+"' where id ="+itemId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
});

app.get('/items_delete/:itemId',(req, res) => {
	const itemId = req.params.itemId;
	let sql	= `SELECT * FROM items where id = ${itemId}`;
	let query =connection.query(sql,(err, result) => {
		if(err) throw err;
		res.render('items_delete', {
			item : result[0]
		});
	});
});
app.get('/delete/:itemId',(req, res) => {
	const itemId = req.params.itemId;
	let sql	= `DELETE FROM items where id = ${itemId}`;
	let query =connection.query(sql,(err, result) => {
		if(err) throw err;
		res.redirect('/');
	});
});

// server listening
app.listen(2000, ()=> {
	console.log('Server listening at port 2000')
});