

function getSearchResults(input){
  var url = "https://www.googleapis.com/customsearch/v1"
  var key = process.env.API_KEY;
  var engine = process.env.ENGINe_KEY;
  var type ="image";
  var query = input;
  var request = url+"?key="+key+"&cx="+engine+"&q="+query+"&searchType="+type;
  console.log(request)
  
  var https = require("https")
  https.get(request, function(resp){
    var body = '';
    resp.on('data', function(d) {
      body += d;
    });
    
    resp.on('end', function(resp){
      var data = JSON.parse(body)
      console.log(data)
    })    
  })
    
  
}

function getSearchHistory(){
  console.log("Search History goes here")
}

module.exports={getSearchResults, getSearchHistory}