var router = require('express').Router();
var tweetBank = require('../tweetBank');
var tweets = tweetBank.list();
var currUser = tweetBank.getUser;
var firstsies = currUser.replace(/\s\S+/,'');
console.log(currUser);

module.exports = function(io){
	router.get('/', function (req, res) {
  		res.render( 'index', {title: 'Twitter.js', tweets: tweets, currUser: currUser, first: firstsies} );
	});

	router.get('/:id', function(req, res) {
		res.render( 'index', {title: 'Twitter.js', tweets: [tweets[req.params.id]], currUser: currUser, first: firstsies} );
	})

	router.get('/name/:name', function(req, res) {
		var name = req.params.name.split("_").map(function(val){
			return val.slice(0,1).toUpperCase() + val.slice(1);
		}).join(" ");
		console.log(name);
		res.render( 'index', {title: 'Twitter.js', tweets: tweetBank.find({name: name}), currUser: currUser, first: firstsies, name: name} );
	})

	router.post('/submit',function(req,res,next){
		tweet= {
			name: req.body.name,
			text: req.body.tweet
		};
		io.sockets.emit('new_tweet',tweet);
		tweetBank.add(req.body.name, req.body.tweet);
	})
	return router;
};