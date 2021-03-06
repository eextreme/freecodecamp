var fs = require('fs')
var url = require('url')
var express = require("express")
var bp = require('body-parser')
var http = require("http")
var time = require("./scripts/tsm.js")
var getInfo = require("./scripts/rhpm.js")
var getUrl = require("./scripts/usm.js")
var isa = require("./scripts/isa.js")

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
  //console.log(req)
  var backUrl="https://substantial-screw.glitch.me/USM"
  getUrl(req.params[0], function(res){
    switch (res['type']){
      case "redir":
        resp.redirect(res['link'])
        break;
      case "created":
        resp.send(res)
        break;
      case "invalid":  
        resp.send("<h2>invalid website link.</h2><a href="+backUrl+">Click here to go back</a>")
        break;
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

app.get('/ISA/imagesearch/*', function(req, resp){
  isa.storeSearchHistory(req.headers['x-forwarded-for'].split(",")[0], req.params[0], new Date(), function(res){
    console.log("Request stored as: "+res)
  })
  isa.getSearchResults(req.params[0], req.query.offset, function(res){
    resp.send(res)
  })
})

app.get('/ISA/searchhistory', function(req, resp){
  isa.getSearchHistory(function(res){
    resp.send(res)
  })
})

app.get('/FMM', function(req, resp){
  resp.sendFile(__dirname + '/views/fmm.html')
})

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.post('/FMM/upload', upload.single('upload'), function (req, res, next) {
  var size=req.file.size
  res.send({size: size})
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
})

app.use('/',express.static(__dirname+'/public'));

app.listen(process.env.PORT,function(){
});
