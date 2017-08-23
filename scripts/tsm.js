function getTime(time){
  console.log("Your input is: ")
  var query = /^[0-9]*$/
  var chrono = require('chrono-node')
  var parsed = chrono.parseDate(time)
  var unix, date, input;
  var ref = {0: "January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June", 
             6:"July", 7:"August", 8:"September", 9:"October", 10:"November", 11:"December"};
  
  if (parsed){
    input = "Natural Date"
    unix = Date.parse(parsed)/1000
    date = ref[parsed.getMonth()]+" "+parsed.getDate() + ", "+parsed.getFullYear()
  }
  else if (time.match(query)){
    var temp = new Date(time*1000)
    input = "Unix Date Number"
    unix = temp.getTime()
    date = ref[temp.getMonth()]+" "+temp.getDate() + ", "+temp.getFullYear()
    }
  else {
      unix = null;
      date = null;
    }
  
  return {"input":input, "unix": unix, "natural": date};
}

module.exports = getTime