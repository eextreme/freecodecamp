function getTime(time){
  console.log("Your input is: ")
  var query = /^[0-9]/i
  var chrono = require('chrono-node')
  if (time.match(query))
    {
      console.log("UNIX Timestamp Detected")
      chrono.parse
    }
  else
    {
      console.log("Natural Language Timestamp Detected")
      
    }
}

module.exports = getTime