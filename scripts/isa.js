

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

function getSearchHistory(){
  console.log("Search History goes here")
}

module.exports={getSearchResults, getSearchHistory}