function getInfo(info){
  var ip = info.rawHeaders[9].split(",")
  var lang = info.rawHeaders[29].split(",")
  var soft = info.rawHeaders[21].match((^\(*\)$))[0]
  return {"ip":ip[0],"lang":lang[0], "soft":soft}
}

module.exports = getInfo 