function getInfo(info){
  var regex = /\((.*)\)/
  var ip = info.rawHeaders[9].split(",")
  var lang = info.rawHeaders[29].split(",")
  //var soft = regex.exec(info.rawHeaders[21])
  var soft = info.rawHeaders[21]
  return {"ip":ip[0],"lang":lang[0], "soft":soft}
}

module.exports = getInfo 