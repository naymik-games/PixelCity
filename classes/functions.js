
function isConnectedToRoad() {

}


//reference

//////////////////////////////////////////////////////////////////////////////
// POWER/WATER
////////////////////////////////////////////////////////////////////////////
function getPowerConsumption() {
  var resCapacity = (sim.gameData.zoneCounts[0] * 3) + (sim.gameData.zoneCounts[1] * 12) + (sim.gameData.zoneCounts[2] * 50)
  var comCapacity = (sim.gameData.zoneCounts[3] * 6) + (sim.gameData.zoneCounts[4] * 20) + (sim.gameData.zoneCounts[5] * 80)
  var indCapacity = (sim.gameData.zoneCounts[6] * 12) + (sim.gameData.zoneCounts[7] * 64) + (sim.gameData.zoneCounts[8] * 64)
  var otherCapacity = 0
  for (i = 9; i < sim.gameData.zoneCounts.length; i++) {
    if (i == 19) {
      otherCapacity += sim.gameData.zoneCounts[i] * 5
    } else if (i == 22) {
      otherCapacity += sim.gameData.zoneCounts[i] * 1000
    } else if (i == 23) {
      otherCapacity += sim.gameData.zoneCounts[i] * 1
    } else if (i == 17 || i == 16) {
      otherCapacity += sim.gameData.zoneCounts[i] * 20
    } else {
      otherCapacity += sim.gameData.zoneCounts[i] * 100
    }

  }
  var totalCapicity = resCapacity + comCapacity + indCapacity + otherCapacity
  return [resCapacity, comCapacity, indCapacity, otherCapacity, totalCapicity]
}
function addPowerPlant(mapXY, id, yearAdded) {
  sim.gameData.powerPlants.push([mapXY, id, yearAdded])
}
function addWaterPlant(mapXY, id, yearAdded) {
  sim.gameData.waterPlants.push([mapXY, id, yearAdded])
}
function removePowerPlant(mapxy) {
  var ind = -1
  for (var i = 0; i < sim.gameData.powerPlants.length; i++) {
    var station = sim.gameData.powerPlants[i][0]
    if (station.x == mapxy.x && station.y == mapxy.y) {
      ind = i
    }
  }
  if (ind > -1) {
    sim.gameData.powerPlants.splice(ind, 1)
  }
}
function removeWaterPlant(mapxy) {
  var ind = -1
  for (var i = 0; i < sim.gameData.waterPlants.length; i++) {
    var station = sim.gameData.waterPlants[i][0]
    if (station.x == mapxy.x && station.y == mapxy.y) {
      ind = i
    }
  }
  if (ind > -1) {
    sim.gameData.waterPlants.splice(ind, 1)
  }
}
function waterInRange(point) {
  //0 1 5
  var smallTower = false
  var waterPump = false
  var largeTower = false

  var tiles = getTilesInRange(point, buildMenu[2].subMenu[0].waterRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 0 && tiles[i].parentMenu == 2) {
      smallTower = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[1].waterRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 1 && tiles[i].parentMenu == 2) {
      waterPump = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[5].waterRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 5 && tiles[i].parentMenu == 2) {
      largeTower = true
    }
  }
  if (smallTower || largeTower || waterPump) {
    return true
  } else {
    return false
  }
}
function powerInRange(point) {
  //0 1 5
  var coal = false //3
  var wind = false //6
  var solar = false //7
  var gas = false //9
  var fusion = false //10
  var nuclear = false //11

  var tiles = getTilesInRange(point, buildMenu[2].subMenu[3].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 3 && tiles[i].parentMenu == 2) {
      coal = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[6].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 6 && tiles[i].parentMenu == 2) {
      wind = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[7].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 7 && tiles[i].parentMenu == 2) {
      solar = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[9].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 9 && tiles[i].parentMenu == 2) {
      gas = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[10].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 10 && tiles[i].parentMenu == 2) {
      fusion = true
    }
  }
  var tiles = getTilesInRange(point, buildMenu[2].subMenu[11].powerRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 11 && tiles[i].parentMenu == 2) {
      nuclear = true
    }
  }
  if (coal || wind || solar || gas || fusion || nuclear) {
    return true
  } else {
    return false
  }
}
////////////////////////////////////////////////////////////////////////////////////////
// HEALTH SAFETY
////////////////////////////////////////////////////////////////////////////////////////
function addCrime(point, data) {
  //crime
  if (data.crime == 0) { return }
  if (data.zone < 9) {
    var lv = getLandValue(point)
    var tiles = this.getTilesInRange(point, data.crimeRadius[lv.lvIndex])
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].crime = tiles[i].crime + data.crime[lv.lvIndex]
    }
  } else {
    var tiles = this.getTilesInRange(point, data.crimeRadius)
    for (var i = 0; i < tiles.length; i++) {
      // var d = Math.round(getDistance(point, tiles[i].xy))
      tiles[i].crime = tiles[i].crime + data.crime
    }
  }
}
function removeCrime(point, data) {
  //crime
  if (data.crime == 0) { return }
  if (data.zone < 9) {
    var lv = getLandValue(point)
    var tiles = this.getTilesInRange(point, data.crimeRadius[lv.lvIndex])
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].crime = tiles[i].crime - data.crime[lv.lvIndex]
    }
  } else {
    var tiles = this.getTilesInRange(point, data.crimeRadius)
    for (var i = 0; i < tiles.length; i++) {
      // var d = Math.round(getDistance(point, tiles[i].xy))
      tiles[i].crime = tiles[i].crime - data.crime
    }
  }

}
function addPoliceStation(mapXY, id, yearAdded) {
  sim.gameData.policeStations.push([mapXY, id, yearAdded])
}
function removePoliceStation(mapxy) {
  var ind = -1
  for (var i = 0; i < sim.gameData.policeStations.length; i++) {
    var station = sim.gameData.policeStations[i][0]
    if (station.x == mapxy.x && station.y == mapxy.y) {
      ind = i
    }
  }
  if (ind > -1) {
    sim.gameData.policeStations.splice(ind, 1)
  }
}
function policeInRange(point) {
  //0 1 5
  var ps = 0
  // var ph = 0
  var policePer = sim.gameData.maintenanceCostsPer[14]
  var radPS = gameRules.phRadius - getCovSub(policePer)

  var radPH = gameRules.phRadius - getCovSub(policePer)

  var tiles = getTilesInRange(point, radPS)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 2 && tiles[i].parentMenu == 3) {
      ps++
    }
  }
  var tiles = getTilesInRange(point, radPH)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].menu == 5 && tiles[i].parentMenu == 3) {
      ps += 2
    }
  }
  //console.log(ps)
  return ps
  /* if (ps || ph) {
    return true
  } else {
    return false
  } */
}
function getCrimeAfterCoverage(point, crime) {
  var crimefighting = policeInRange(point)
  var finalCrime = 0
  if (crimefighting == 0) {
    finalCrime = crime
  } else if (crimefighting == 1) {
    finalCrime = crime * .75
  } else if (crimefighting == 2) {
    finalCrime = crime * .5
  } else if (crimefighting >= 3) {
    finalCrime = crime * .25
  }
  return finalCrime
}
function getAverageCrime() {
  var count = 0
  var totalC = 0
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      if (tile.hasBuilding) {

        totalC += tile.crime
        count++
      }

    }
  }
  console.log('total' + totalC + 'count ' + count)
  /*  if (totalC < 1) {
     totalC = 1
   } */
  return Math.round(totalC / count)
}
////////////////////////////////////////////////////////////////////////////////////////
// POLLUTION
////////////////////////////////////////////////////////////////////////////////////////
function addPollution(point, data) {
  //air

  var tiles = this.getTilesInRange(point, data.airPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {

    var d = getDistanceAlt(point, tiles[i].xy)
    var v = data.airPollutionRadius - (d - 1)
    var per = v / data.airPollutionRadius
    tiles[i].pollution[0] = tiles[i].pollution[0] + Math.round(data.airPollution * per)


  }
  //water
  var tiles = this.getTilesInRange(point, data.waterPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    var d = getDistanceAlt(point, tiles[i].xy)
    var v = data.waterPollutionRadius - (d - 1)
    var per = v / data.waterPollutionRadius
    tiles[i].pollution[1] = tiles[i].pollution[1] + Math.round(data.waterPollution * per)


  }
}
function removePollution(point, data) {
  //air
  var tiles = this.getTilesInRange(point, data.airPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    var d = getDistanceAlt(point, tiles[i].xy)
    // console.log(d)
    var v = data.airPollutionRadius - (d - 1)
    var per = v / data.airPollutionRadius
    tiles[i].pollution[0] -= clamp(tiles[i].pollution[0] + Math.round(data.airPollution * per), 0, 100000)
  }
  //water
  var tiles = this.getTilesInRange(point, data.waterPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    var d = getDistanceAlt(point, tiles[i].xy)
    // console.log(d)
    var v = data.airPollutionRadius - (d - 1)
    var per = v / data.airPollutionRadius
    tiles[i].pollution[1] -= clamp(tiles[i].pollution[1] + Math.round(data.airPollution * per), 0, 100000)
  }
}
function updatePollution() {
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]
      tile.pollution[0] = 0
      tile.pollution[1] = 0
    }
  }
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = grid[y][x]

      if (tile.menu != null) {
        var point = { x: x, y: y }
        addPollution(point, buildMenu[tile.parentMenu].subMenu[tile.menu])
      }
    }
  }
}
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
  console.log('total' + totalLV + 'count ' + count)
  if (totalLV < 1) {
    totalLV = 1
  }
  sim.gameData.averageLV = Math.round(totalLV / count)
  // console.log('tlv ' + totalLV + ', count ' + count)
  console.log(sim.gameData.averageLV)
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
////////////////////////////////////////////////////////////////////////////////
// MAP
////////////////////////////////////////////////////////////////////////////////
function buildingsDim() {
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = gridImage[y][x]
      if (tile.building != null) {
        tile.building.setAlpha(.3)
      }
    }
  }

}
function buildingsBright() {
  for (var y = 0; y < mapConfig.height; y++) {
    for (var x = 0; x < mapConfig.width; x++) {
      var tile = gridImage[y][x]
      if (tile.building != null) {
        tile.building.setAlpha(1)
      }
    }
  }

}

//////////////////////////////////////////////////////////////////////////////
// FINANCE
///////////////////////////////////////////////////////////////////////////////
function getResTaxIncome() {
  // TR x pop x LV x Modifier x months
  if (sim.gameData.averageLV < 1) {
    var lv = 1
  } else {
    var lv = sim.gameData.averageLV
  }
  return Math.round(sim.gameData.taxRates[0] * sim.gameData.population * lv * 0.0035)
}
function getComTaxIncome() {
  var comCapacity = sim.gameData.zoneCounts[3] * 2 + sim.gameData.zoneCounts[4] * 3 + sim.gameData.zoneCounts[5] * 6
  return Math.round(sim.gameData.taxRates[1] * comCapacity * 22 * 0.0045)
}
function getIndTaxIncome() {
  var indCapacity = sim.gameData.zoneCounts[6] * 2 + sim.gameData.zoneCounts[7] * 3 + sim.gameData.zoneCounts[8] * 6
  return Math.round(sim.gameData.taxRates[2] * indCapacity * 22 * 0.005)
}
function getTotalMaintenanceCost() {
  var total = 0
  for (var i = 0; i < sim.gameData.maintenanceCostsSpending.length; i++) {
    total += sim.gameData.maintenanceCostsSpending[i]
  }
  return total
}
function getTotalFlexibleMaintenanceCost() {
  var total = 0
  for (var i = 0; i < sim.gameData.maintenanceCostsSpending.length; i++) {
    if (i == 9 || i == 13 || i == 14 || i == 15 || i == 16 || i == 18 || i == 23) {
      total += sim.gameData.maintenanceCostsSpending[i]
    }
  }
  return total
}
function getTotalFixedMaintenanceCost() {
  var total = 0
  for (var i = 0; i < sim.gameData.maintenanceCostsSpending.length; i++) {
    if (i == 10 || i == 11 || i == 12 || i == 17 || i == 19 || i == 20 || i == 21 || i == 22) {
      total += sim.gameData.maintenanceCostsSpending[i]
    }
  }
  return total
}
function getPowerMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[9]
  return total
}
function getPoliceMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[14]
  return total
}
function getFireMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[15]
  return total
}
function getHealthMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[13]
  return total
}
function getEducationMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[16]
  return total
}
function getParksMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[18]
  return total
}
function getTransportationMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[23]
  return total
}
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
////////////////////////////////////////////////////////////////////////////////////
// TRAFFIC
////////////////////////////////////////////////////////////////////////////////////
function driveTimes() {

  console.log('drive times')
  gridTrans = null
  gridTrans = create2DArrayValue(mapConfig.width, mapConfig.height)
  failedTripCount = 0
  successfullTripCount = 0
  tripsAttempted = 0
  var com = sim.gameData.zoneCounts[3] + sim.gameData.zoneCounts[4] + sim.gameData.zoneCounts[5]
  var ind = sim.gameData.zoneCounts[6] + sim.gameData.zoneCounts[7] + sim.gameData.zoneCounts[8]
  var total = com + ind
  var comPer = (com / total) - .05
  var indPer = (ind / total) - .05
  console.log('com per:' + comPer + ' ind per: ' + indPer)
  for (var y = 0; y < sim.gameData.mapConfig.height; y++) {
    for (var x = 0; x < sim.gameData.mapConfig.width; x++) {
      if (Phaser.Math.Between(1, 100) < 26) {
        if (grid[y][x].zone == 0 || grid[y][x].zone == 1 || grid[y][x].zone == 2) {
          var rand = Math.random()
          var dest
          if (rand < comPer) {
            //dest = [3, 4, 5]
            dest = 'com'
          } else if (rand < total) {
            //dest = [6, 7, 8]
            dest = 'ind'
          } else {
            //dest = [0, 1, 2]
            dest = 'res'
          }
          var tr = tryDriveTo({ x: x, y: y }, dest, getDensityMultiplier(grid[y][x].zone))
          //console.log(tr)
          if (tr) {
            // grid[y][x].driveToWork = tr;
          } else {
            // grid[y][x].driveToWork = 0
          }
        } else if (grid[y][x].zone == 3 || grid[y][x].zone == 4 || grid[y][x].zone == 5) {
          var rand = Math.random()
          var dest
          if (rand < .70) {
            //dest = [0, 1, 2]
            dest = 'res'
          } else if (rand < .9) {
            //dest = [6, 7, 8]
            dest = 'ind'
          } else {
            // dest = [3, 4, 5]
            dest = 'com'
          }
          var tr = tryDriveTo({ x: x, y: y }, dest, getDensityMultiplier(grid[y][x].zone))
        } else if (grid[y][x].zone == 6 || grid[y][x].zone == 7 || grid[y][x].zone == 8) {
          var rand = Math.random()
          var dest
          if (rand < .50) {
            //dest = [0, 1, 2]
            dest = 'res'
          } else if (rand < .3) {
            // dest = [6, 7, 8]
            dest = 'ind'
          } else {
            //. dest = [3, 4, 5]
            dest = 'com'
          }
          var tr = tryDriveTo({ x: x, y: y }, dest, getDensityMultiplier(grid[y][x].zone))
        }
      }
    }
  }
  //console.log(gridTrans)
  console.log('failed ' + failedTripCount)
  console.log('success ' + successfullTripCount)
  console.log('attempted ' + tripsAttempted)
}
function tryDriveTo(point, target, density) {
  // console.log(point)
  tripsAttempted++
  var road = findRoad(point);
  //	console.log(road)
  if (!road) {
    failedTripCount++
    return -1;
  }
  if (target == 'res') {
    var target1 = getRandomResTile()
  } else if (target == 'com') {
    var target1 = getRandomComTile()
  } else if (target == 'ind') {
    var target1 = getRandomIndTile()
  }
  if (target1 == null) { return }
  var route = [];

  //Maximum steps to try driving to destination
  var maxDist = 200;
  var lastPos = null;
  var currentPos = road;
  var targetFound = false;
  var found = -1;
  for (var distance = 0; distance < maxDist; distance++) {
    var pos = findNextRoad({ x: currentPos.x, y: currentPos.y }, lastPos);

    //No road found
    if (pos == null) {
      //Go back if possible
      if (lastPos != null) {
        pos = lastPos;
        lastPos = currentPos;
        currentPos = pos;
        // distance += 3;
      }
      else {
        failedTripCount++
        return false;

      }
    }
    //Found road so go there
    else {
      lastPos = currentPos;
      currentPos = pos;
      gridTrans[pos.y][pos.x] += density
      //every other
      //	if(distance & 1) {
      route.push(pos);
      //	}
      found = findTargetTile(pos, target1)
      if (found) {
        targetFound = true;
        break;
      }
    }
  }

  if (!targetFound) {
    failedTripCount++
    return false;
  } else {
    // console.log('route length ' + route.length + ' startX ' + point.x + ',startY ' + point.y)
    //console.log(route)
    successfullTripCount++
    return route.length
  }


  //return true;
}
function findNextRoad(point, prevPos) {
  //offsets for up, down, left, right for moving
  var posX = [-1, 1, 0, 0];
  var posY = [0, 0, -1, 1];

  if (!prevPos) {
    prevPos = { x: -1, y: -1 };
  }

  var directions = [];
  for (var i = 0; i < 4; i++) {
    var xx = point.x + posX[i];
    var yy = point.y + posY[i];
    //console.log(point)
    //console.log('xx ' + xx + ', yy ' + yy)
    if (!(xx == prevPos.x && yy == prevPos.y) && isRoad({ x: xx, y: yy })) {
      directions.push({ x: xx, y: yy });
    }
  }

  var options = directions.length;
  if (options == 0) {
    return null;
  }

  if (options == 1) {
    return directions[0];
  }

  return directions[Phaser.Math.Between(0, directions.length - 1)];
}
function findTarget(pos, target) {
  //offsets for up, down, left, right
  var posX = [-1, 1, 0, 0];
  var posY = [0, 0, -1, 1];
  var tiles = getTilesInRange(pos, gameRules.roadRange);
  for (var i = 0; i < tiles.length; i++) {
    //var xx = pos.x + posX[i];
    //var yy = pos.y + posY[i];
    for (var j = 0; j < target.length; j++) {
      if (validPoint(tiles[i].xy.x, tiles[i].xy.y) && tiles[i].zone == target[j]) {
        return true;
      }
    }
  }

  return false;
}
function findTargetTile(pos, target) {
  //offsets for up, down, left, right
  var posX = [-1, 1, 0, 0];
  var posY = [0, 0, -1, 1];
  var tiles = getTilesInRange(pos, gameRules.roadRange);
  for (var i = 0; i < tiles.length; i++) {
    //var xx = pos.x + posX[i];
    //var yy = pos.y + posY[i];

    if (validPoint(tiles[i].xy.x, tiles[i].xy.y) && tiles[i].xy.x == target.x && tiles[i].xy.y == target.y) {
      return true;
    }

  }

  return false;
}
function roadInRange(point) {
  var tiles = getTilesInRange(point, gameRules.roadRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].type == 'road' || tiles[i].type == 'rail') {
      return true
    }
  }
  return false
}
function findRoad(point) {
  var tiles = getTilesInRange(point, gameRules.roadRange)
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].type == 'road' || tiles[i].type == 'rail') {
      return tiles[i].xy
    }
  }
  return false
}
function isRoad(point) {
  if (grid[point.y][point.x].type == 'road' || grid[point.y][point.x].type == 'rail') {
    return true
  }
  return false
}
function getDensityMultiplier(zone) {
  if (zone == 0 || zone == 3 || zone == 6) {
    return 1
  } else if (zone == 1 || zone == 4 || zone == 7) {
    return 2
  } else if (zone == 2 || zone == 5 || zone == 8) {
    return 3
  }
}
////////////////////////////////////////////////////////////////////////////////////////
// EDUCATION
////////////////////////////////////////////////////////////////////////////////////////
function addSchool(capacity) {
  sim.gameData.schoolCapacity += capacity
}
function removeSchool(capacity) {
  sim.gameData.schoolCapacity -= capacity
}
function getEq() {

  var wfEqTotal = 0
  var pEqTotal = 0
  for (var i = 0; i < sim.gameData.generations.length; i++) {
    if (i > 4 && i < 13) {
      wfEqTotal += sim.gameData.generations[i].EQ
    }
    pEqTotal += sim.gameData.generations[i].EQ
  }
  return { pEQ: Math.round(pEqTotal / sim.gameData.generations.length), wfEQ: Math.round(wfEqTotal / 8) }
}
function eqDecay() {
  for (var i = 0; i < sim.gameData.generations.length; i++) {
    if (i > 4) {
      sim.gameData.generations[i].EQ -= sim.gameData.generations[i].EQ * 0.019
    }

  }
}
function parentalEducation() {
  var eq = getEq()

  sim.gameData.generations[1].EQ += eq.wfEQ / 5
  sim.gameData.generations[2].EQ += eq.wfEQ / 5

  var numOf10 = Math.ceil(sim.gameData.population * (sim.gameData.generations[1].count / 100))
  var numOf15 = Math.ceil(sim.gameData.population * (sim.gameData.generations[2].count / 100))
  var numOf20 = Math.ceil(sim.gameData.population * (sim.gameData.generations[3].count / 100))
  var numOf25 = Math.ceil(sim.gameData.population * (sim.gameData.generations[4].count / 100))

  var numInSchool = numOf10 + numOf15 + numOf20
  if (sim.gameData.schoolCapacity == 0) {
    var eqAdd = 0
  }
  else if (numInSchool <= sim.gameData.schoolCapacity) {
    sim.gameData.generations[1].EQ += sim.gameData.generations[1].EQ * .0126
    sim.gameData.generations[2].EQ += sim.gameData.generations[2].EQ * .0126
    sim.gameData.generations[3].EQ += sim.gameData.generations[3].EQ * .0126
  }

  console.log('count up to 10 ' + numOf10 + 'count up to 15 ' + numOf15)


}
/////////////////////////////////////////////////////////////////////////////////
// HELPER/UTILITY
///////////////////////////////////////////////////////////////////////////////
function getTilesInRange(point, range) {
  var tilesInRange = [];
  for (var y = point.y - range; y <= point.y + range; y++) {
    for (var x = point.x - range; x <= point.x + range; x++) {
      if (this.validPoint(x, y)) {
        tilesInRange.push(grid[y][x])
      }

    }
  }
  return tilesInRange
}

function getRandomIndTile() {

  var ind = sim.gameData.zoneCounts[6] + sim.gameData.zoneCounts[7] + sim.gameData.zoneCounts[8]
  if (ind == 0) {
    return null
  }
  var found = false
  while (!found) {
    var ranX = Phaser.Math.Between(0, sim.gameData.mapConfig.width - 1)
    var ranY = Phaser.Math.Between(0, sim.gameData.mapConfig.height - 1)
    if (grid[ranY][ranX].zone == 6 || grid[ranY][ranX].zone == 7 || grid[ranY][ranX].zone == 7) {
      found = true
      return { x: ranX, y: ranY }
    }
  }
}
function getRandomResTile() {

  var res = sim.gameData.zoneCounts[0] + sim.gameData.zoneCounts[1] + sim.gameData.zoneCounts[2]
  if (res == 0) {
    return null
  }
  var found = false
  while (!found) {
    var ranX = Phaser.Math.Between(0, sim.gameData.mapConfig.width - 1)
    var ranY = Phaser.Math.Between(0, sim.gameData.mapConfig.height - 1)
    if (grid[ranY][ranX].zone == 0 || grid[ranY][ranX].zone == 1 || grid[ranY][ranX].zone == 2) {
      found = true
      return { x: ranX, y: ranY }
    }
  }
}
function getRandomComTile() {
  var com = sim.gameData.zoneCounts[3] + sim.gameData.zoneCounts[4] + sim.gameData.zoneCounts[5]
  if (com == 0) {
    return null
  }
  var found = false
  while (!found) {
    var ranX = Phaser.Math.Between(0, sim.gameData.mapConfig.width - 1)
    var ranY = Phaser.Math.Between(0, sim.gameData.mapConfig.height - 1)
    if (grid[ranY][ranX].zone == 3 || grid[ranY][ranX].zone == 4 || grid[ranY][ranX].zone == 5) {
      found = true
      return { x: ranX, y: ranY }
    }
  }
}
function getCovSub(per) {
  var sub = 0
  if (per > 110) {
    sub = -3
  } else if (per > 100) {
    sub = -2
  } else if (per == 100) {
    sub = 0
  } else if (per < 60) {
    sub = 5
  } else if (per < 70) {
    sub = 4
  } else if (per < 80) {
    sub = 3
  } else if (per < 90) {
    sub = 2
  } else if (per < 100) {
    sub = 1
  }
  return sub
}
function getDistanceAlt(point1, point2) {
  return Math.abs(point2.x - point1.x) + Math.abs(point2.y - point1.y)
}
function getDistance(point1, point2) {
  var a = point1.x - point2.x;
  var b = point1.y - point2.y;

  var c = Math.hypot(a, b)
  return c
}
function validPoint(x, y) {
  return x >= 0 && x < sim.gameData.mapConfig.width && y >= 0 && y < sim.gameData.mapConfig.height
}
function getPoint(x, y) {
  return { x: x, y: y }
}
function clamp(value, min, max) {
  if (value < min)
    return min;
  if (value > max)
    return max;

  return value;
};
function perc2color(perc) {

  var r, g, b = 0;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  }
  else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  var h = r * 0x10000 + g * 0x100 + b * 0x1;
  //return ('000000' + h.toString(16)).slice(-6)
  return '0x' + ('000000' + h.toString(16)).slice(-6);
}
function create2DArrayValue(numRows, numColumns) {
  let array = new Array(numRows);

  for (let i = 0; i < numColumns; i++) {
    array[i] = new Array(numColumns).fill(0);
  }

  return array;
}
function colorGradient(fadeFraction, rgbColor1, rgbColor2, rgbColor3) {

  var color1 = rgbColor1;
  var color2 = rgbColor2;
  var fade = fadeFraction;

  // Do we have 3 colors for the gradient? Need to adjust the params.
  if (rgbColor3) {
    fade = fade * 2;

    // Find which interval to use and adjust the fade percentage
    if (fade >= 1) {
      fade -= 1;
      color1 = rgbColor2;
      color2 = rgbColor3;
    }
  }

  var diffRed = color2.red - color1.red;
  var diffGreen = color2.green - color1.green;
  var diffBlue = color2.blue - color1.blue;

  var gradient = {
    red: parseInt(Math.floor(color1.red + (diffRed * fade)), 10),
    green: parseInt(Math.floor(color1.green + (diffGreen * fade)), 10),
    blue: parseInt(Math.floor(color1.blue + (diffBlue * fade)), 10),
  };

  //return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';

  var h = gradient.red * 0x10000 + gradient.green * 0x100 + gradient.blue * 0x1;
  //return ('000000' + h.toString(16)).slice(-6)
  return '0x' + ('000000' + h.toString(16)).slice(-6);

}
/*
var color1 = {
  red: 19, green: 233, blue: 19
};
var color3 = {
  red: 255, green: 0, blue: 0
};
var color2 = {
  red: 255, green: 255, blue: 0
};
var col = colorGradient(.99, color3, color2, color1) */

/*
let mapConfig = {
  width: 64,
  height: 64,
  eastCost: false,
  westCost: true,
  northCost: false,
  southCost: true,
  eWRiver: true,
  nSRiver: false,
  numLakes: 1


} */

//reference
/* let zoneNames = [
  0 'Light Residential', 
  1 'Medium Residential', 
  2 'Dense Residential', 
  3 'Light Commercial', 
  4 'Medium Commercial', 
  5 'Dense Commercial', 
  6 'Clean Industry', 
  7 'Dirty Industry', 
  8 'Dirty Industry', 
  9 'Power', 
  10 'Water', 
  11 'Waste', 
  12 'Communication', 
  13 'Health', 
  14 'Police', 
  15 'Fire', 
  16 'Education', 
  17 'Culture', 
  18 'Parks', 
  19 'Recreation', 
  20 'Government', 
  21'Special', 
  22 'Military', 
  23 'Transportation'
  ] */