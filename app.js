var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var socketio = require('socket.io');

//middleware
app.use(express.static(__dirname + '/public')); //to access our static css file
app.use(morgan('dev')); // POINT
app.use(bodyParser({extended: false}));
app.set('port', process.env.PORT || '3000')

//swiggin'
app.engine("html", swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");
swig.setDefaults({ cache: false });

//set up socket
var server = app.listen(3000, function(err){
	console.log('listening on %s',app.get('port'));
});
var io = socketio.listen(server);

app.use(require('./routes/')(io));