function createShortURL(fullUrl){
  var MongoClient = require('mongodb').MongoClient
  var db_url = "mongodb://tester:tester@ds149763.mlab.com:49763/eextreme_db"
  
  MongoClient.connect(db_url, function(err, db){
    if (err) throw "connection failed"
    
    var rand = Math.floor((Math.random() * 100000) + 1);
    
    var urlList = db.collection('urls')
    var query = {shortKey: fullUrl}
    
    var doc = urlList.findOne(query)
    console.log(doc)
    
    if (doc.fullU) {
      console.log("shorturl found")
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

module.exports = createShortURL;