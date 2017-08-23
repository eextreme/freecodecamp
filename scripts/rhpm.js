function getInfo(info){
  var regex = /\((.*?)\)/g
  var ip = info.rawHeaders[9].split(",")
  var lang = info.rawHeaders[29].split(",")
  var soft = regex.exec(info.rawHeaders[21])[1]
  return {"ip":ip[0],"lang":lang[0], "soft":soft}
}

module.exports = getInfo 