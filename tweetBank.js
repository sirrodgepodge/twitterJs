var _ = require('underscore');
var data = [];

var add = function (name, text){
	data.push({
		name: name,
		text: text
	});
};

var find = function (properties) {
	return _.where(data, properties);
};

var randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var fakeNames = ['Nimit Maru', 'David Yang', 'Omri Bernstein', 'Charlotte Leasia', 'Joe Alves','Zeke Nierenberg'];

var getUser = fakeNames.splice(Math.floor(Math.random()*fakeNames.length),1)[0];

var getFakeName = function() {
  return randArrayEl(fakeNames);
};

var getFakeTweet = function() {
  var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for(var i=0; i<10; i++) {
  add( getFakeName(), getFakeTweet() );
}

var list = function (properties) {
	return data;
};

module.exports = { add: add, list: list, find: find ,getUser: getUser};