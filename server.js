var fs = require('fs')
var express = require("express")
var http = require("http")

var app = express();
app.set("view", 'view/index.html')

app.get('/:time',function(req,res){
    var data = req.params;
    // console.log(data);
    res.send(req)
});
app.use('/',express.static(__dirname+'/public'));

app.listen(process.env.PORT,function(){
    console.log('Everything is OK');
});
