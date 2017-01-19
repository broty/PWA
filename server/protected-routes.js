var express = require('express'),
jwt     = require('express-jwt'),
config  = require('./config'),
quoter  = require('./quoter');

var app = module.exports = express.Router();

// <
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectId;
var mongo = require('mongodb');

var db_url =   'mongodb://root:admin@ds141368.mlab.com:41368/pwa'


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

var jwtCheck = jwt({
  secret: config.secret
});
// />

app.use('/api/protected', jwtCheck);

app.get('/api/protected/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});

// <
app.get('/api/protected/topic/:id', function(req, res) {
  console.log('id_get: ' + req.params.id);

  var resultArray = [];

  mongo.connect(db_url,
    function(err,db) {
      //var cursor = db.collection('topics').find({topic_id: Number(req.params.id)});
      var cursor = db.collection('topics').find({_id: new ObjectId(req.params.id)});
      cursor.forEach(function(doc,err) {
        resultArray.push(doc.topic_name);
      }, function() {
        //var cursor = db.collection('messages').find({topic_id: Number(req.params.id)});
        var cursor = db.collection('messages').find({topic_id: req.params.id});
        cursor.forEach(function(doc,err) {
          resultArray.push(doc);
        }, function() {
          db.close();
          res.send(resultArray);
          //console.log(resultArray);
        });
      });
    }
  );
});

app.post('/api/protected/topic/:id', function(req,res) {
  console.log('id_post: ' + req.params.id);

  var item = {
    topic_id: req.params.id,
    autor: req.body.autor,
    datum: new Date().toISOString().replace('T', ' ').substr(0, 19),
    zprava: req.body.message
  }

  mongo.connect(db_url, function(err, db) {
    db.collection('messages').insertOne(item, function(err, result) {
      db.close();
    });
  });


  //res.redirect('/topic/' + req.params.id);
});

app.post('/api/protected/topics', function (req, res) {
  console.log("HUAAAAA");
  //console.log(req.body.topic_name);
  var item = {
    topic_name: req.body.topic_name
  };

  mongo.connect(db_url, function(err, db) {
    db.collection('topics').insertOne(item, function(err, result) {
      db.close();
    });
  });

  //res.redirect('/topics');
});

app.get('/api/protected/topics', function (req, res) {
  var resultArray = [];
  mongo.connect(db_url, function(err,db) {
    var cursor = db.collection('topics').find();
    cursor.forEach(function(doc,err) {
      resultArray.push(doc);
    }, function() {
      db.close();
      res.send(resultArray);
      //console.log(resultArray);
    });
  });
});
