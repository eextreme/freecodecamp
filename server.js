var fs = require('fs')
var express = require("express")
var bp = require('body-parser')
var http = require("http")
var time = require("./scripts/tsm.js")
var getInfo = require("./scripts/rhpm.js")
var getUrl = require("./scripts/usm.js")
//var circJ = require("circular-json")

var app = express();
//app.set("view", 'view/index.html')

app.set('strict routing', true)

app.get('/', function (req, resp) {
  resp.sendFile(__dirname + '/views/index.html');
});

//Timestamp microservice
app.get('/TSM', function(req, resp){
  resp.sendFile(__dirname + '/views/tsm.html')
})

app.get('/TSM/:input', function(req, resp){
  resp.json(time(req.params.input))
})
//Timestamp microservice

//Reader Header Parser Microservice
app.get('/RHPM', function(req, resp){
  var res = getInfo(req)
  app.set('view engine', 'pug')
  resp.render('rhpm', { ipaddress: res["ip"], lang: res["lang"], software: res["soft"], data: JSON.stringify(res)})
})
//Reader Header Parser Microservice

//Url Shortener Microservice
app.get('/USM', function(req, resp){
  resp.sendFile(__dirname + '/views/usm.html')
})

app.get('/USM/:input*', function (req, resp){
  console.log(req.query)
  getUrl(req.query, function(res){
    switch (res['type']){
      case "redir":
        res.contentType('application/json');
        var data = JSON.stringify(res['link'])
        res.header('Content-Length', data.length);
        res.send(data);
        break;
      case "created":
        resp.send(res['shortUrl'])
        break;
      case "invalid":
        resp.send("<h2>invalid website link</h2>")
        break
      default:
        resp.send(JSON.stringify(res))
        break;
    }    
  })
})
//Url Shortener Microservice

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
});
