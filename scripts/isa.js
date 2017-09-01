

function getSearchResults(input, offset, callback){  
  var url = "https://www.googleapis.com/customsearch/v1"
  var key = process.env.API_KEY;
  var engine = process.env.ENGINE_KEY;
  var type ="image";
  var page = offset*10 || 1;
  var query = input;
  var request = url+"?key="+key+"&cx="+engine+"&q="+query+"&searchType="+type+"&start="+page;
  
  console.log("Query: " + query)
  console.log("Starting Page: " + page)
  
  var https = require("https")
  https.get(request, function(resp){
    var body = '';
    resp.on('data', function(d) {
      body += d;
    });
    
    resp.on('end', function(resp){
      var doc=[]
      var data = JSON.parse(body)
      data.items.forEach(function(item){
        doc.push({imageLink: item.link, originLink: item.displayLink, snippet: item.snippet })
      })
      
      return callback(doc)
    })    
  }) 
}

function storeSearchHistory(ipaddress, query, timestamp){
  var MongoClient = require('mongodb').MongoClient
  var db_url = "mongodb://tester:tester@ds149763.mlab.com:49763/eextreme_db"
  
  MongoClient.connect(db_url, function(err, db){
    if (err) throw "connection failed"

    var rand = Math.floor((Math.random() * 100000) + 1);
    
    var qhistory = db.collection('qhistory')
    var entry = {requester:ipaddress, query:query, time:timestamp}
    
    qhistory.insertOne(entry)
  })
  
  
}

function getSearchHistory(){
  console.log("Search History goes here")
}

module.exports={getSearchResults, getSearchHistory, storeSearchHistory}