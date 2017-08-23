function getTime(time){
  console.log("Your input is: ")
  var query = /^[0-9]*?/i
  var chrono = require('chrono-node')
  var unix;
  var date;
  var ref = {0: "January", 1:"February", 2:"March", 3:"April", 4:"May", 5:"June", 
             6:"July", 7:"August", 8:"September", 9:"October", 10:"November", 11:"December"};
  
  if (time.match(query))
    {
      console.log("UNIX Timestamp Detected")
      var parsed = new Date(time*1000)
      
      unix = time;
      date = ref[parsed.getMonth()]+" "+parsed.getDate()+", "+parsed.getFullYear()
      
    }
  else
    {
      console.log("Natural Language Timestamp Detected")
      var parsed = chrono.parse(time)[0].start.date()

      
      if (parsed){
        unix = Date.parse(parsed)/1000
        date = ref[parsed.getMonth()]+" "+parsed.getDate()+", "+parsed.getFullYear()
        //date = parsed
      }
      else
        {
          unix = null;
          date = null;
        }
    }
  
  return {"unix": unix, "natural": date};
}

module.exports = getTime