module.exports = function(io) { // catch here

  var express = require('express');
  var router  = express.Router();

  app.get('/', function(req, res){
    console.log(req.body, req.params, req.query)
    console.log("Successfully added as collab")
    res.sendFile(__dirname + '/index.html');
  });
  
  app.post('/:username', function(req, res, next){
    console.log(req.body, req.params, req.query)
    console.log('in here!', req.params)
    res.json({ 
      user: req.params
    })
  })
  
  return router;
}
