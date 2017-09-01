

function getSearchResults(input, offset, callback){  
  var url = "https://www.googleapis.com/customsearch/v1"
  var key = process.env.API_KEY;
  var engine = process.env.ENGINE_KEY;
  var type ="image";
  var page = if(offset) return offset*10 else return 0;
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
      var data = JSON.parse(body)
      return callback(data)
    })    
  })
    
  
}

function getSearchHistory(){
  console.log("Search History goes here")
}

module.exports={getSearchResults, getSearchHistory}