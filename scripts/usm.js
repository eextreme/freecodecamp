function createShortURL(fullUrl){
  var MongoClient = require('mongodb').MongoClient
  var db_url = "mongodb://tester:tester@ds149763.mlab.com:49763/eextreme_db"
  var results=[]
  
  MongoClient.connect(db_url, function(err, db){
    if (err) throw "connection failed"

    var rand = Math.floor((Math.random() * 100000) + 1);
    
    var urlList = db.collection('urls')
    var query = {shortKey: Number.parseInt(fullUrl)}
    
    urlList.findOne(query, function(err, data){
      if (data){
        console.log(fullUrl + " " + data['fullurl'])
        results={type: "redir", link: data['fullurl']}
      }
      else{
        var entry = {shortKey: rand, fullurl:fullUrl}
        urlList.insertOne(entry)
        console.log(fullUrl+" has been added")
        results={added: rand}
      }
    })
  })
  
  if (results){
    return results;
  }
}

module.exports = createShortURL;