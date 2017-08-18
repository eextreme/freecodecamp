var fs = require('fs')
var mango = require('mongodb').MongoClient

var express = require("express")
var http = require("http")

var app = express();

app.get('/test', function(req, resp){
    resp.send("This appears")
})

http.createse
