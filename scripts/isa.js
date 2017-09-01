

function getSearchResults(input){
  var url = "https://www.googleapis.com/customsearch/v1"
  var key = "AIzaSyDvv4_BfBGozm9DfW2nUrg2wUK5RC4D77Y"
  var engine = "002023485820325712212:tfka6ekczha"
  var query = input;
  
  var http = require("http")
  http.get(url+"?key="+key+"&cx="+engine+"&q="+query, function(data){
  console.log(JSON.stringify(data))
  })
  
}

function getSearchHistory(){
  console.log("Search History goes here")
}

module.exports={getSearchResults, getSearchHistory}