function getTime(time){
  console.log("Your input is: ")
  var query = /^[0-9]/i
  var chrono = require('chrono-node')
  var unix;
  var date;
  
  if (time.match(query))
    {
      console.log("UNIX Timestamp Detected")
      unix = time;
      date = new Date(time*1000)
    }
  else
    {
      console.log("Natural Language Timestamp Detected")
      unix = chrono.parseDate(time)
      if (unix){
        unix = chrono.parseDate(time).getTime()/1000
        date = chrono.parseDate(time)
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