function createShortURL(fullUrl){
  var MongoClient = require('mongodb').MongoClient
  var db_url = "mongodb://tester:tester@ds149763.mlab.com:49763/eextreme_db"
  
  MongoClient.connect(db_url, function(err, db){
    if (err) throw "connection failed"
    
    var rand = Math.floor((Math.random() * 100000) + 1);
    
    var urlList = db.collection('urls')
    var query = {shortKey: Number.parseInt(fullUrl)}
    
    urlList.findOne(query, function(data, err){
      console.log(JSON.stringify(doc)  
    })
    
    
    
    if (doc['fullurl']) {
      console.log("shorturl found: "+ doc.fullurl)
      return "The short url takes you to: "+ doc.fullurl
    }
    else{
      console.log("shorturl not found")
      var entry = {shortKey: rand, fullurl: fullUrl}
      urlList.insertOne(entry)
      return "Your short url is: https://substantial-screw.glitch.me/USM/" + rand;
    }
  })
}

function check()


module.exports = createShortURL;