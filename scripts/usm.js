function createShortURL(fullUrl, callback){
  var MongoClient = require('mongodb').MongoClient
  var db_url = "mongodb://tester:tester@ds149763.mlab.com:49763/eextreme_db"
  
  var ch1 = /http:\/\/www\..*\..*$/
  var ch2 = /https:\/\/www\..*\..*$/
  var ch3 = /[0-9]*/
  
  if (!fullUrl.match(ch1) && !fullUrl.match(ch2) && !fullUrl.match(ch3)){
    var results = {type: "invalid", link: fullUrl}
    callback(results);
  }
  
  MongoClient.connect(db_url, function(err, db){
    if (err) throw "connection failed"

    var rand = Math.floor((Math.random() * 100000) + 1);
    
    var urlList = db.collection('urls')
    var query = {shortKey: Number.parseInt(fullUrl)}
    
    urlList.findOne(query, function(err, data){
      if (data){
        console.log(fullUrl + " " + data['fullurl'])
        var results={type: "redir", link: data['fullurl']}
        callback(results)
      }
      else{
        var entry = {shortKey: rand, fullurl:fullUrl}
        urlList.insertOne(entry)
        console.log(fullUrl+" has been added")
        var results={type: "created", shortUrl: "https://substantial-screw.glitch.me/USM/"+rand}
        callback(results)
      }
    })
  })  
}

module.exports = createShortURL
