function createShortURL(fullUrl){
  var MongoClient = require('mongodb').MongoClient
  var db_url = "ds149763.mlab.com:49763/eextreme_db"
  
  MongoClient.connect(db_url,function(db, err){
    if (err) throw err
    var rand = Math.floor((Math.random() * 100000) + 1);
    
    var collection = db.collection("urls")
    var query = {shortKey: fullUrl}
    
    var doc = collection.findOne(query)
    
    if (doc) return doc.fullurl
    else{
      var entry = {shortKey: rand, fullurl: fullUrl}
      collection.insertOne(entry)
      return rand;
    }
  })
}

module.exports = createShortURL;