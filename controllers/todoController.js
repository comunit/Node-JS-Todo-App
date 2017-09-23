var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect('replace this with your connection',{useMongoClient: true});

//create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

  app.get('/todo', function (req, res) {
    //get data from mongo db and passed it to view
    Todo.find({},function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })
  });

  app.post('/todo', urlencodedParser, function (req, res) {
    //get data from the view and add it to mongo db
    var newTodo = Todo(req.body).save(function(err,data){
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function (req, res) {
    //Delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
};