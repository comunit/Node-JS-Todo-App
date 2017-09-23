var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'))

//listen for port
app.listen(3000);

//fire controllers
todoController(app);

console.log('You are listening to port 3000');



