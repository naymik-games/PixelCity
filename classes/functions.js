
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
  lvObject.distance = distance
  lvObject.global = sim.gameData.globalLV[0]
  var landvalue = distance + sim.gameData.globalLV[0]
  //console.log('lv dis glob: ' + landvalue)
  if (dwater <= 5.1) {
    var waterBonus = landvalue * (.5 / dwater)
  } else {
    var waterBonus = 0
  }
  lvObject.waterBonus = Math.round(waterBonus)
  landvalue = landvalue + Math.round(waterBonus)
  //landvalue = clamp(landvalue, 0, 255)

  // console.log('lv water: ' + landvalue)
  landvalue += tile.localLandValue
  lvObject.local = tile.localLandValue
  //console.log('lv local: ' + landvalue + ' (' + tile.localLandValue + ')')
  var pollutionadder = getAirPollutionEffect(tile.pollution[0], landvalue)
  landvalue = landvalue + pollutionadder
  lvObject.airpol = pollutionadder
  //console.log('lv 3: ' + landvalue + ' (' + pollutionadder + ')')
  var wpolladder = getWaterPollutionEffect(tile.pollution[1], landvalue)
  landvalue = landvalue + wpolladder
  //console.log('lv 4: ' + landvalue + ' (' + wpolladder + ')')
  lvObject.waterpol = wpolladder
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
  sim.gameData.averageLV = Math.round(totalLV / count)
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