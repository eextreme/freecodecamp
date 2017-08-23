function getTime(time){
  console.log("Your input is: ")
  var query = /^[0-9]/i
  if (time.match(query))
    {
      console.log("UNIX Timestamp Detected")
    }
  else
    {
      console.log("Natural Language Timestamp Detected")
      
    }
}

module.exports = getTime