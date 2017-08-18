var fs = require('fs')
var mango = require('mongodb').MongoClient

var express = require("express")
var http = require("http")

var app = express();

app.post('/test', function(req, resp){
    resp.send("This appears")
})

app.listen(process.env.PORT)
