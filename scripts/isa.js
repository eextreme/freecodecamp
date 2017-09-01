

function getSearchResults(input){
  var url = "https://www.googleapis.com/customsearch/v1"
  var key = "AIzaSyDvv4_BfBGozm9DfW2nUrg2wUK5RC4D77Y"
  var engine = "002023485820325712212:tfka6ekczha"
  var query = input;
  var request = url+"?key="+key+"&cx="+engine+"&q="+query;
  console.log(request)
  
  var https = require("https")
  https.get(request, function(resp){
    var body = '';
    resp.on('data', function(d) {
      body += d;
    });
    
    resp.on('end', function(resp){
      console.log("got data")
      console.log(body)
    })    
  })
    
  
}

function getSearchHistory(){
  console.log("Search History goes here")
}

module.exports={getSearchResults, getSearchHistory}