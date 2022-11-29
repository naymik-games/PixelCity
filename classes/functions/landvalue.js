//////////////////////////////////////////////////////////////////////////////////////
// LAND VALUE
//////////////////////////////////////////////////////////////////////////////////////
function addGlobalLandValue(data) {
  sim.gameData.globalLV[0] += data.globalLV[0]
  sim.gameData.globalLV[1] += data.globalLV[1]
  sim.gameData.globalLV[2] += data.globalLV[2]
  sim.gameData.globalLV[3] += data.globalLV[3]
}
function removeGlobalLandValue(data) {
  sim.gameData.globalLV[0] -= data.globalLV[0]
  sim.gameData.globalLV[1] -= data.globalLV[1]
  sim.gameData.globalLV[2] -= data.globalLV[2]
  sim.gameData.globalLV[3] -= data.globalLV[3]
}
function addLocalLandValue(point, data) {
  var tiles = this.getTilesInRange(point, 5)
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].localLandValue += data.localLV
  }
}
function removeLocalLandValue(point, data) {
  var tiles = this.getTilesInRange(point, 5)
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].localLandValue -= data.localLV
  }
}
function getLandValue(point) {
  var lvObject = {}
  var tile = grid[point.y][point.x]
  var distance = getDistanceBonus(tile.xy)
  var dwater = distanceFromOpenWater(tile.xy, 5)
  //BASE
  lvObject.base = gameRules.baseLV
  lvObject.distance = distance
  lvObject.global = sim.gameData.globalLV[0]
  //START
  var landvalueStart = distance + sim.gameData.globalLV[0] + gameRules.baseLV
  //console.log('lv dis glob: ' + landvalue)
  if (dwater <= 5.1) {
    var waterBonus = landvalueStart * (.5 / dwater)
  } else {
    var waterBonus = 0
  }
  lvObject.waterBonus = Math.round(waterBonus)

  //ADD WATER
  var landvalue = landvalueStart + Math.round(waterBonus)
  //landvalue = clamp(landvalue, 0, 255)

  // console.log('lv water: ' + landvalue)
  //ADD LOCAL
  landvalue += tile.localLandValue
  lvObject.local = tile.localLandValue
  //ADD CRIME

  var finalCrime = getCrimeAfterCoverage(tile.xy, tile.crime)
  lvObject.finalCrime = finalCrime
  var crimeAdder = getCrimeEffect(finalCrime)

  landvalue += crimeAdder
  lvObject.crimeadder = crimeAdder
  //console.log('lv local: ' + landvalue + ' (' + tile.localLandValue + ')')
  var pollutionadder = getAirPollutionEffect(tile.pollution[0], landvalueStart)

  //ADD AIR POLLUTION
  landvalue = landvalue + pollutionadder
  lvObject.airpol = pollutionadder
  //console.log('lv 3: ' + landvalue + ' (' + pollutionadder + ')')
  var wpolladder = getWaterPollutionEffect(tile.pollution[1], landvalueStart)
  //ADD WATER POLLUTION
  landvalue = landvalue + wpolladder
  lvObject.waterpol = wpolladder
  //console.log('lv 4: ' + landvalue + ' (' + wpolladder + ')')

  lvObject.landvalue = landvalue
  lvObject.lvIndex = getLVIndex(landvalue)
  return lvObject
}
function getAverageLV() {
  var count = 0
  var totalLV = 0
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      if (tile.terrain != 'water') {
        var temp = getLandValue(tile.xy)
        totalLV += temp.landvalue
        count++
      }

    }
  }
  // console.log('total' + totalLV + 'count ' + count)
  if (totalLV < 1) {
    totalLV = 1
  }
  sim.gameData.averageLV = Math.round(totalLV / count)
  // console.log('tlv ' + totalLV + ', count ' + count)
  //console.log(sim.gameData.averageLV)
}
function getLVIndex(value) {
  if (value < gameRules.lvLow) {
    var t = 0
  } else if (value < gameRules.lvMed) {
    var t = 1
  } else {
    var t = 2
  }
  return t
  //
}
function getRCIIndex(zone, lvIndex) {
  if (zone == 0) {
    var rciIndex = 0 + lvIndex //res light
  } else if (zone == 1) {
    var rciIndex = 3 + lvIndex //res med
  } else if (zone == 2) {
    var rciIndex = 6 + lvIndex //res dense
  } else if (zone == 3) {
    var rciIndex = 9 + lvIndex //com light
  } else if (zone == 4) {
    var rciIndex = 12 + lvIndex //com med
  } else if (zone == 5) {
    var rciIndex = 15 + lvIndex //com dense
  } else if (zone == 6) {
    var rciIndex = 18 + 0 //ind light
  } else if (zone == 7) {
    var rciIndex = 20 + 0 //ind med
  } else if (zone == 7) {
    var rciIndex = 22 + 0 //ind d
  }
  return rciIndex
  //000 000 000   000 000 000   00 00 00 
}
/* function updateLocalLandValue() {
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      tile.localLandValue = 0
    }
  }
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      var point = { x: x, y: y }
      addLocalLandValue(point, buildMenu[tile.parentMenu].subMenu[tile.menu])
    }
  }
} */
function nearOpenWater(point, range) {
  var tiles = this.getTilesInRange(point, range)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].terrain == 'water') {

      return true

    }
  }
  return false
}
function distanceFromOpenWater(point, range) {
  var distances = []
  var tiles = this.getTilesInRange(point, range)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].terrain == 'water') {
      //console.log(getDistance(point, tiles[i].xy))
      distances.push(getDistance(point, tiles[i].xy))
      //return true

    }
  }
  //console.log(distances)
  var val = clamp(Math.min(...distances), 0, 10)
  const min = val

  //console.log(Math.round(min * 10) / 10)
  return Math.round(min * 10) / 10
}
function getAirPollutionEffect(pollution, landvalue) {
  if (pollution > gameRules.apNormal) {
    var p1 = pollution - gameRules.apNormal
    var p3 = p1 / gameRules.apNormal
    var pollutionadd = (landvalue * p3) / 4
    return Math.round(-pollutionadd)
  } else {
    var p2 = gameRules.apNormal - pollution
    var p3 = p2 / gameRules.apNormal
    var pollutionadd = (landvalue * p3) / 4
    return Math.round(pollutionadd)
  }
}
function getCrimeEffect(crime) {
  if (gameRules.crimeNormal >= crime) {
    var diff = gameRules.crimeNormal - crime
    return diff * 10
  } else {
    var diff = crime - gameRules.crimeNormal
    return (diff * 10) * -1
  }
}
function getWaterPollutionEffect(pollution, landvalue) {
  if (pollution > gameRules.wpNormal) {
    var p1 = pollution - gameRules.wpNormal
    var p3 = p1 / gameRules.wpNormal
    var pollutionadd = landvalue * p3
    return Math.round(-pollutionadd)
  } else {
    var p2 = gameRules.wpNormal - pollution
    var p3 = p2 / gameRules.wpNormal
    var pollutionadd = landvalue * p3
    return Math.round(pollutionadd)
  }
}
function getDistanceBonus(mapxy) {

  var popPer = sim.gameData.population / 2500000
  var bonusMax = 155 * popPer
  bonusMax = Math.max(bonusMax, 50)

  var distance = getCityCenterDistance(mapxy)
  var dp = distance / mapConfig.width
  var distanceBonus = bonusMax * Math.min(dp, .8)
  distanceBonus = bonusMax - distanceBonus
  return Math.ceil(distanceBonus)
}
function getCityCenterDistance(point) {
  var centerX = Math.floor(mapConfig.width / 2);
  var centerY = Math.floor(mapConfig.height / 2);
  var xDis, yDis
  if (point.x > centerX) {
    xDis = point.x - centerX;
  } else {
    xDis = centerX - point.x
  }
  if (point.y > centerY) {
    yDis = point.y - centerY;
  } else {
    yDis = centerY - point.y
  }
  return Math.min(xDis + yDis, mapConfig.width)
  //console.log('center x ' + centerX + ', center y ' + centerY)

}