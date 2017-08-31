var http

function getSearchResults(input){
  var http = require('http');
  var site = "https://www.google.ca/search?q="+input+"&dcr=0&source=lnms&tbm=isch";

//The url we want is `www.nodejitsu.com:1337/`
var options = {
  host: site,
};

var callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}
  
  var req = http.request(options, callback);
//This is the data we are posting, it needs to be a string or a buffer
  console.log(req)
  
}

function getSearchHistory(){
  console.log("Search History goes here")
}

module.exports={getSearchResults, getSearchHistory}