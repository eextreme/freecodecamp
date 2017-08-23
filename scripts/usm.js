function createShortUrl(fullUrl){
  var MongoClient = require('mongodb').MongoClient
  var db_url = "ds149763.mlab.com:49763/eextreme_db"
  Mongoclient.connect(db_url,function(db, err){
    if (err) throw err
    var collection = db.collection("urls")
    var query = {shorturl: fullUrl}
    var doc = collection.findOne(query)
    return doc.fullurl
  }
                      }

module.export = createShortUrl;