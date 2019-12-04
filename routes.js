
// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// var cors = require('cors')
// var bodyParser = require('body-parser')
// var axios = require('axios')


// // parse application/json
// app.use(bodyParser.json())

// app.use(cors({
// 	origin: function(origin, callback){
// 		return callback(null, true);
// 	},
// 	optionsSuccessStatus: 200,
// 	credentials: true
// }));


module.exports = function(io) { // catch here

  var express = require('express');
  var router  = express.Router();

  router.get('/', function(req, res){
    console.log(req.body, req.params, req.query)
    console.log("Successfully added as collab")
    res.sendFile(__dirname + '/index.html');
  });
  
  router.post('/:username', function(req, res, next){
    console.log(req.body, req.params, req.query)
    console.log('in here!', req.params)

    io.sockets.emit('user', req.params.username)
    io.sockets.emit('user2', {user: req.params.username})
    io.sockets.emit('user3', socket.id, req.params.username)
    io.sockets.emit("broadcast-message", socket.id, data);

    res.json({ 
      user: req.params
    })
  })

  return router;
}
