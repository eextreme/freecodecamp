var fs = require('fs')
var express = require("express")
var http = require("http")

var app = express();
app.set("view", 'view/index.html')

app.get("/", function (req, resp) {
  resp.sendFile(__dirname + '/views/index.html');
});

app.get("/TSM", function(req, resp){
  resp.sendFile(__dirname + '/views/tsm.html')
})
app.get("/RHPM", function(req, resp){
  resp.sendFile(__dirname + '/views/rhpm.html')
})


app.get('/test',function(req,res){
    var data = req.params;
    // console.log(data);
    res.send("<h1>here is your link</h1>")
});
app.use('/',express.static(__dirname+'/public'));

app.listen(process.env.PORT,function(){
    console.log('Everything is OK');
});
