var express = require('express'),
_       = require('lodash'),
config  = require('./config'),
jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

var mongo = require('mongodb');

var db_url =   'mongodb://root:admin@ds141368.mlab.com:41368/pwa'

//
function createUser(profile) {
  console.log("Vytvarim uzivatele: \n" + profile);
  mongo.connect(db_url, function(err, db) {
    db.collection('users').insertOne(profile, function(err, result) {
      db.close();
    });
  });
}

function loadUsers() {
  var resultArray = [];
  mongo.connect(db_url, function(err,db) {
    var cursor = db.collection('users').find();
    cursor.forEach(function(doc,err) {
      resultArray.push(doc);
    }, function() {
      db.close();
    });
  });
  return resultArray;
}

var users = loadUsers();

// XXX: This should be a database of users :).
/*var users = [{
id: 1,
username: 'gonto',
password: 'gonto'
}];*/

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

function getUserScheme(req) {

  var username;
  var type;
  var userSearch = {};

  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

app.post('/users', function(req, res) {

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  if (_.find(users, userScheme.userSearch)) {
    return res.status(400).send("A user with that username already exists");
  }

  var profile = _.pick(req.body, userScheme.type, 'password');

  console.log("profil: " + profile);
  createUser(profile);
  users.push(profile);

  res.status(201).send({
    id_token: createToken(profile)
  });
});

app.post('/sessions/create', function(req, res) {

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, userScheme.userSearch);

  if (!user) {
    return res.status(401).send("The username or password don't match");
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
