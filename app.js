var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors')
var bodyParser = require('body-parser')
var axios = require('axios')

// parse application/json
app.use(bodyParser.json())

app.use(cors({
	origin: function(origin, callback){
		return callback(null, true);
	},
	optionsSuccessStatus: 200,
	credentials: true
}));


app.get('/', function(req, res){
	console.log(req.body, req.params, req.query)
	console.log("Successfully added as collab")
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res, next){
	console.log(req.body, req.params, req.query)
	console.log('in here!')
	axios
	.get(`https://www.codewars.com/api/v1/users/${req.body.webhook.id}`)
	.then(data => {
		console.log(`This is the information on ${userInfo}`);
		console.log(data);
	})
	.catch(err => {
		// console.log("User not found!")
		console.log(err);
	});
})

io.on('connection', function(socket){
	io.sockets.emit("user-joined", socket.id, io.engine.clientsCount, Object.keys(io.sockets.clients().sockets));

	socket.on('signal', (toId, message) => {
		io.to(toId).emit('signal', socket.id, message);
  	});

    socket.on("message", function(data){
		io.sockets.emit("broadcast-message", socket.id, data);
    })

	socket.on('disconnect', function() {
		io.sockets.emit("user-left", socket.id);
	})
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000', process.env);
});

// var express = require('express')
// var cors = require('cors')
//   //, routes = require('./routes');
// var app = require('express')(3000);

// 	// app.use(cors())

	
// 	var server = require('http').Server(app);
// 	var io = require('socket.io')(server);
// //var app = module.exports = express();

// //var io = require('socket.io')(app);



// app.listen(3000, function(){
// 	console.log("Express server listening on port %d in %s mode", process.env);
// });