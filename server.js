var fs = require('fs')
var express = require("express")
var http = require("http")
var time = require("./scripts/tsm.js")
var getInfo = require("./scripts/rhpm.js")
var circJ = require("circular-json")

var app = express();
//app.set("view", 'view/index.html')

app.get('/', function (req, resp) {
  resp.sendFile(__dirname + '/views/index.html');
});

app.get('/TSM', function(req, resp){
  resp.sendFile(__dirname + '/views/tsm.html')
})

app.get('/TSM/:input', function(req, resp){
  resp.json(time(req.params.input))
})

app.get('/RHPM', function(req, resp){
  var res = getInfo(req)
  app.set('view engine', 'pug')
  resp.render('rhpm', { ipaddress: 'Implementing', lang: 'Implementing', software: "Implementing", data: circJ.stringify(req)})
})

app.get('/USM', function(req, resp){
  resp.sendFile(__dirname + '/views/usm.html')
})

app.get('/USM/:input', function(req, resp){
  resp.send("USM result: " + req.params)
})

app.get('/ISA', function(req, resp){
  resp.sendFile(__dirname + '/views/isa.html')
})

app.get('/ISA/:input', function(req, resp){
  resp.send("ISA result: " + req.params)
})

app.get('/FMM', function(req, resp){
  resp.sendFile(__dirname + '/views/fmm.html')
})

app.get('/FMM/:input', function(req, resp){
  resp.send("FMM result: " + req.params)
})

app.use('/',express.static(__dirname+'/public'));

app.listen(process.env.PORT,function(){
    console.log('Everything is OK');
});
