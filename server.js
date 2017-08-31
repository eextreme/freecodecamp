var fs = require('fs')
var url = require('url')
var express = require("express")
var bp = require('body-parser')
var http = require("http")
var time = require("./scripts/tsm.js")
var getInfo = require("./scripts/rhpm.js")
var getUrl = require("./scripts/usm.js")
//var circJ = require("circular-json")

var app = express();
//app.set("view", 'view/index.html')

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

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

app.get('/USM/*', function (req, resp){
  var backURL=req.header('Referer') || '/';
  //console.log(req)
  getUrl(req.params[0], function(res){
    switch (res['type']){
      case "redir":
        resp.redirect(res['link'])
        break;
      case "created":
        resp.send(res['shortUrl'])
        break;
      case "invalid":  
        resp.send("<h2>invalid website link. Redirecting...</h2>")
        resp.redirect(backURL)
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
