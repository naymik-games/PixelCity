
function isConnectedToRoad() {

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
  8 'Power', 
  9 'Water', 
  10 'Waste', 
  11 'Communication', 
  12 'Health', 
  13 'Police', 
  14 'Fire', 
  15 'Education', 
  16 'Culture', 
  17 'Parks', 
  18 'Recreation', 
  19 'Government', 
  20 'Special', 
  21 'Military', 
  22 'Transportation'
  ] */
//////////////////////////////////////////////////////////////////////////////
// POWER
////////////////////////////////////////////////////////////////////////////
function getPowerConsumption() {
  var resCapacity = (sim.gameData.zoneCounts[0] * 3) + (sim.gameData.zoneCounts[1] * 12) + (sim.gameData.zoneCounts[2] * 50)
  var comCapacity = (sim.gameData.zoneCounts[3] * 6) + (sim.gameData.zoneCounts[4] * 20) + (sim.gameData.zoneCounts[5] * 80)
  var indCapacity = (sim.gameData.zoneCounts[6] * 12) + (sim.gameData.zoneCounts[7] * 64)
  var otherCapacity = 0
  for (i = 8; i < sim.gameData.zoneCounts.length; i++) {
    if (i == 18) {
      otherCapacity += sim.gameData.zoneCounts[i] * 5
    } else if (i == 21) {
      otherCapacity += sim.gameData.zoneCounts[i] * 1000
    } else if (i == 22) {
      otherCapacity += sim.gameData.zoneCounts[i] * 1
    } else if (i == 16 || i == 15) {
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
////////////////////////////////////////////////////////////////////////////////////////
// POLLUTION
//////////////////////////////////////////////////////////////////////////////////////
function addPollution(point, data) {
  //air
  var tiles = this.getTilesInRange(point, data.airPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].pollution[0] += data.airPollution
  }
  //water
  var tiles = this.getTilesInRange(point, data.waterPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].pollution[1] += data.waterPollution
  }
}
function removePollution(point, data) {
  //air
  var tiles = this.getTilesInRange(point, data.airPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].pollution[0] -= data.airPollution
  }
  //water
  var tiles = this.getTilesInRange(point, data.waterPollutionRadius)
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].pollution[1] -= data.waterPollution
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
  const min = Math.min(...distances)

  console.log(Math.round(min * 10) / 10)
  return Math.round(min * 10) / 10
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
  return Math.round(sim.gameData.taxRates[0] * sim.gameData.population * 22 * 0.0035)
}
function getComTaxIncome() {
  var comCapacity = sim.gameData.zoneCounts[3] + sim.gameData.zoneCounts[4] * 2 + sim.gameData.zoneCounts[5] * 4
  return Math.round(sim.gameData.taxRates[1] * comCapacity * 22 * 0.0045)
}
function getIndTaxIncome() {
  var indCapacity = sim.gameData.zoneCounts[6] * 2 + sim.gameData.zoneCounts[7] * 4
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
    if (i == 8 || i == 12 || i == 13 || i == 14 || i == 15 || i == 17 || i == 22) {
      total += sim.gameData.maintenanceCostsSpending[i]
    }
  }
  return total
}
function getTotalFixedMaintenanceCost() {
  var total = 0
  for (var i = 0; i < sim.gameData.maintenanceCostsSpending.length; i++) {
    if (i == 9 || i == 10 || i == 11 || i == 16 || i == 18 || i == 19 || i == 20 || i == 21) {
      total += sim.gameData.maintenanceCostsSpending[i]
    }
  }
  return total
}
function getPowerMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[8]
  return total
}
function getPoliceMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[13]
  return total
}
function getFireMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[14]
  return total
}
function getHealthMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[12]
  return total
}
function getEducationMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[15]
  return total
}
function getParksMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[17]
  return total
}
function getTransportationMaintenanceCost() {
  var total = 0
  total += sim.gameData.maintenanceCostsSpending[22]
  return total
}
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
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


function getDistance(point1, point2) {
  var a = point1.x - point2.x;
  var b = point1.y - point2.y;

  var c = Math.hypot(a, b)
  return c
}
function validPoint(x, y) {
  return x >= 0 && x < mapConfig.width && y >= 0 && y < mapConfig.height
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

  return '#' + ('000000' + h.toString(16)).slice(-6);
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
  8 'Power', 
  9 'Water', 
  10 'Waste', 
  11 'Communication', 
  12 'Health', 
  13 'Police', 
  14 'Fire', 
  15 'Education', 
  16 'Culture', 
  17 'Parks', 
  18 'Recreation', 
  19 'Government', 
  20'Special', 
  21 'Military', 
  22 'Transportation'
  ] */