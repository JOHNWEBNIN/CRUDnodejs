const path = require('path');
const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const app =express();

// server listening

app.listen(3000, ()=> {
	console.log('Server listening at port 3000')
});