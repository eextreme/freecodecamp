function getInfo(info){
  var ip = info.rawHeaders[9]
  var lang = info.rawHeaders[29]
  var soft = info.rawHeaders[21]
  return {"ip":ip,"lang":lang, "soft":soft}
}

module.exports = getInfo 