function getTime(time){
  console.log("Your input is: ")
  var query = /^[0-9]/i
  var chrono = require('chrono-node')
  
  if (time.match(query))
    {
      console.log("UNIX Timestamp Detected")
      var date = new Date(time*1000)
      
    }
  else
    {
      console.log("Natural Language Timestamp Detected")
      return chrono.parseDate(time)
    }
}

module.exports = getTime