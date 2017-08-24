function createShortURL(fullUrl){
  var MongoClient = require('mongodb').MongoClient
  var db_url = "mongodb://tester:tester@ds149763.mlab.com:49763/eextreme_db"
  
  var input = fullUrl.toString();
  
  MongoClient.connect(db_url, function(err, db){
    if (err) throw "connection failed"
    
    var rand = Math.floor((Math.random() * 100000) + 1);
    
    var urlList = db.collection('urls')
    var query = {shortKey: Number.parseInt(fullUrl)}
    
    urlList.find(query).toArray(function (err, doc){
      if (err) console.error(err)
      if (doc['fullurl']) {
      console.log("shorturl found: "+ doc[0].fullurl)
      return "The short url takes you to: "+ doc[0].fullurl
    }
    else{
      console.log("shorturl not found")
      var entry = {shortKey: rand, fullurl: fullUrl}
      urlList.insertOne(entry)
      return "Your short url is: https://substantial-screw.glitch.me/USM/" + rand;
      }
    }                                      )
  })
}


module.exports = createShortURL;